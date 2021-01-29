package es.sidelab.galaxyaces;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class OnlineHandler extends TextWebSocketHandler {
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception{
		sessions.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
		JsonNode node = mapper.readTree(message.getPayload());
		
		if (node.get("message").asText().equals("delete session")) {
			sessions.remove(session.getId());
		}else {
			sendOtherParticipants(session, node);
		}
	}
	
	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException{
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("name", node.get("name").asText());
		newNode.put("message", node.get("message").asText());
		
		for (WebSocketSession player : sessions.values()) {
			if (!player.getId().equals(session.getId())) {
				player.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
	
}