package es.sidelab.galaxyaces;

public class Player {

	private long id;
	private String nombre;
	private boolean conectado;
	private int nave;
	private boolean ready;

	public Player() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public boolean isConectado() {
		return conectado;
	}

	public void setConectado(boolean conectado) {
		this.conectado = conectado;
	}

	public int getNave() {
		return nave;
	}

	public void setNave(int nave) {
		this.nave = nave;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public boolean isReady() {
		return ready;
	}

	public void setReady(boolean ready) {
		this.ready = ready;
	}
	
	

}
