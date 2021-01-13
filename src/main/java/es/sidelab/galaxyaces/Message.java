package es.sidelab.galaxyaces;

public class Message {
	private long id;
	private String nombre;
	private String cuerpo;
	
	public Message() {}
	
	public Message(long id, String nombre, String cuerpo) {
		this.id = id;
		this.nombre = nombre;
		this.cuerpo = cuerpo;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCuerpo() {
		return cuerpo;
	}
	public void setCuerpo(String cuerpo) {
		this.cuerpo = cuerpo;
	}
	
	
}
