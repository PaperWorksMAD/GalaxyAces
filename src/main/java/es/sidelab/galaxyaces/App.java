package es.sidelab.galaxyaces;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class App implements WebSocketConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) 
	{
		registry.addHandler(createHandlerController(), "/galaxy").setAllowedOrigins("*");
	}

	@Bean
	public HandlerController createHandlerController() 
	{
		return new HandlerController();
	}
}