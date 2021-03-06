package es.sidelab.galaxyaces;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.annotation.PostConstruct;

import java.io.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
public class PlayerController {
		
	private final String dataFile = System.getProperty("user.dir") + "/data.txt";
	private final String chatFile = System.getProperty("user.dir") + "/chat.txt";
	Map<Long, Player> players = new ConcurrentHashMap<>();
	Map<Long, Message> messages = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	AtomicLong nextIdchat = new AtomicLong(0);

	@PostConstruct
	public void init() {
		try {
		BufferedReader log = new BufferedReader(new FileReader(new File(this.chatFile)));
		String line;
		long aux = nextIdchat.incrementAndGet();
		Message m;
		while (((line = log.readLine()) != null) && (aux <= 100)) {
			String[] splited = line.split(": ");
			m = new Message((long)aux, splited[0], splited[1]);
			this.messages.put((long)aux, m);
			aux = nextIdchat.incrementAndGet();
		}
		log.close();
		
		}catch (IOException e){
			System.out.println("te jodes");
		}
	}
	
	@RequestMapping(value = "/players", method = RequestMethod.GET)
	public Collection<Player> getJugadores() {
		return players.values();
	}

	@RequestMapping(value = "/players", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public long addPlayer(@RequestBody Player p) {

		long id = nextId.incrementAndGet();
		p.setId(id);
		players.put(id, p);

		return id;
	}

	@RequestMapping(value = "/players/", method = RequestMethod.GET)
	public ResponseEntity<Collection> getIfPlayers() {
		Collection<Player> playerss = players.values();

		if (!players.isEmpty()) {
			return new ResponseEntity<Collection>(playerss, HttpStatus.OK);
		} else {
			return new ResponseEntity<Collection>(playerss, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/players/{id}", method = RequestMethod.GET)
	public Collection<Player> getItem(@PathVariable long id) throws FileNotFoundException {

		PrintWriter pw = new PrintWriter(new FileOutputStream(new File(this.dataFile), true));

		Player ply = players.get(id);

		pw.append("Nombre: " + ply.getNombre());
		pw.print(' ');
		pw.print("Id: " + ply.getId());
		pw.print(' ');

		if (ply.getNave() == 1) {
			pw.print("Nave: Azul");
		} else if (ply.getNave() == 2) {
			pw.print("Nave: Rosa");
		} else if (ply.getNave() == 3) {
			pw.print("Nave: Verde");
		}
		
		pw.println();

		pw.close();

		return players.values();
	}

	@RequestMapping(value = "/players/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Boolean> changePlayer(@PathVariable long id) {
		
		Player ply = players.get(id);
		if (ply != null) {
			ply.setListo(true);
			return new ResponseEntity<>(true, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value = "/players/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deletePlayer(@PathVariable long id) {

		Player ply = players.get(id);

		if (ply != null) {
			players.remove(ply.getId());
			return new ResponseEntity<>(true, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/playerslog", method = RequestMethod.GET)
	public String[] getLog() throws IOException {

		BufferedReader log = new BufferedReader(new FileReader(new File(this.dataFile)));
		String line;
		String[] nombre = new String[50];
		int aux = 0;

		while (((line = log.readLine()) != null) && (aux <= 50)) {
			String[] splited = line.split(" ");
			nombre[aux] = splited[1];
			aux++;
		}
		log.close();
		return nombre;
	}
	
	//CHAT
	
	@RequestMapping(value = "/chat", method = RequestMethod.GET)
	public Collection<Message> getMessage() {
		return messages.values();
	}
	
	@RequestMapping(value = "/chat", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public long addMessage(@RequestBody Message m) {

		long id = nextIdchat.incrementAndGet();
		m.setId(id);
		messages.put(id, m);
		
		try {
			PrintWriter out = new PrintWriter(new FileOutputStream(new File(this.chatFile), true));
			out.append(m.getNombre() + ": " + m.getCuerpo());
			out.println();
			out.close();
		}catch (IOException e) {
			
		}

		return id;
	}

}
