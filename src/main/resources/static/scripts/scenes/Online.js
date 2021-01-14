import { sceneManager } from "../sceneManager.js";

var playersonline;
var playersnum = 0;
var playerslist;

var refrescar = false;

var servercaido = false;

var playername = null;
var nave;

var arrayNombres;

var pillado = false;
var naveazullock = false;
var naverosalock = false;
//var naveverdelock = false;

var timerjugadores;
var id;
var permitido = true;

var naverosa;
var naveazul;
//var naveverde;

var cuerpo;
var noNombre;
var esperandoJugador;
var entrandopartida;

var numjugadoreslistos = 0;

var mensajes = [];
var i = 0;


export class Online extends Phaser.Scene {
	constructor() {
		super({
			key: sceneManager.SCENES.ONLINE
		})
	}

	init(data) {
		this.efecsound = data.efSound;
		this.efvol = data.efvol;
	}
	
	create() {
		console.log("volumen", this.efvol);
		this.efvol = this.efvol;
		this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondomenu').setDepth(0);
		this.add.image(this.game.renderer.width / 2 - 100, this.game.renderer.height * 0.20, "titulo").setDepth(1);
		
		this.imgcaido = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2, "caido").setDepth(20);
		this.imgcaido.alpha = 0;
		
		this.botonlisto = this.add.image(this.game.renderer.width*0.35, this.game.renderer.height *.85, "listo").setDepth(10);
		this.botonlisto.setScale(0.4);
		this.botonlisto.setInteractive();
		
		this.botonlisto.on("pointerup", () => {
			if(playername != null){
				updatePlayer();	
			}else {
				noNombre.alpha = 1;
				this.time.addEvent({ delay: 2000, callback: function () {noNombre.alpha = 0;}, callbackScope: this, loop: false });
			}
		});
		//Texto
		noNombre = this.add.text(150, 550, 'Introduce un nombre', { font: '26px Courier', fill: '#ffffff' });
		noNombre.setScale(0.75);
		noNombre.alpha = 0;
		
		this.yaseleccionado = this.add.text(150, 550, 'Ya has seleccinado nave', { font: '26px Courier', fill: '#ffffff' });
		this.yaseleccionado.setScale(0.75);
		this.yaseleccionado.alpha = 0;
		
		this.navedisponible = this.add.text(150, 550, 'Nave ya seleccionada', { font: '26px Courier', fill: '#ffffff' });
		this.navedisponible.setScale(0.75);
		this.navedisponible.alpha = 0;
		
		entrandopartida = this.add.text(150, 550, 'Entrando a partida', { font: '26px Courier', fill: '#ffffff' });
		entrandopartida.setScale(0.75);
		entrandopartida.alpha = 0;
				
		this.noNombrevalido = this.add.text(150, 550, 'El nombre ya existe', { font: '26px Courier', fill: '#ffffff' });
		this.noNombrevalido.setScale(0.75);
		this.noNombrevalido.alpha = 0;
						
		this.navetext1 = this.add.text(this.game.renderer.width / 2 - 250, 420, '', { font: '26px Courier', fill: '#ffffff' });
		this.navetext2 = this.add.text(this.game.renderer.width / 2 - 100, 420, '', { font: '26px Courier', fill: '#ffffff' });
		
		this.conectadosNum = this.add.text(180, 180, 'Jugadores conectados: ', { font: '26px Courier', fill: '#ffffff' });
		this.conectadosNum.setScale(0.75);
		
		esperandoJugador = this.add.text(150, 450, 'Esperando otro jugador', { font: '26px Courier', fill: '#ffffff' });
		esperandoJugador.setScale(0.75);
		esperandoJugador.alpha = 0;
		
		this.jugador = 1
		this.shipIndex1 = 0;
		this.shipIndex2 = 0;

		naverosa = this.add.image(this.game.renderer.width / 2 - 50, 350, 'nave2').setDepth(1).setInteractive();
		naveazul = this.add.image(this.game.renderer.width / 2 - 200, 350, 'nave1').setDepth(1).setInteractive();
		//naveverde = this.add.image(this.game.renderer.width / 2 + 150 - 100, 350, 'nave3').setDepth(1).setInteractive();

		naveazul.on("pointerup",()=> this.actionOnNaveAzul());
		naverosa.on("pointerup",()=> this.actionOnNaveRosa());
		//naveverde.on("pointerup",()=> this.actionOnNaveVerde());
		
		let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(2);
		xbt.setInteractive();
		xbt.on("pointerup", () => {
			deletePlayerRoom();
			this.reiniciar();
			this.scene.start(sceneManager.SCENES.MAINMENU, { efSound: this.efecsound, efvol: this.efvol });
		});
				
		document.getElementById('nameinput').style.display = 'block';
		document.getElementById('textinput').style.display = 'block';
		document.getElementById('send-button').style.display = 'block';
		document.getElementById('chat').style.display = 'block';
		
		document.getElementById('send-button').addEventListener("click", escribir.bind(this));
		
		timerjugadores = this.time.addEvent({ delay: 500, callback: this.PlayersOnline, callbackScope: this, loop: true });
		
		this.time.addEvent({ delay: 500, callback: leerFichero, callbackScope: this, loop: true });
		
		this.time.addEvent({ delay: 500, callback: this.EscribirChat, callbackScope: this, loop: true });
		

	}
	
	update() {
		if(refrescar){
			this.refresco();
			this.actnaves();
			this.actplayers();
			refrescar = false;
		}
		
		if (servercaido) {
			console.log('server desconectado');
			servercaido = false;
			timerjugadores.remove(false);
			document.getElementById('nameinput').style.display = 'none' ;
			document.getElementById('textinput').style.display = 'none';
			document.getElementById('send-button').style.display = 'none';
			document.getElementById('chat').style.display = 'none';
			this.imgcaido.alpha = 1;
			deletePlayerRoom();
			this.time.addEvent({ delay: 3000, callback: function () {
				this.scene.start(sceneManager.SCENES.MAINMENU, { efSound: this.efecsound, efvol: this.efvol });
			}, callbackScope: this, loop: false });
		}
		
		while (i < mensajes.length){
			document.getElementById('chat').insertAdjacentHTML("beforeend",mensajes[i].nombre +': '+ mensajes[i].cuerpo + '<br>');
			document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight;
			i++;
		}
		
		this.fondo.tilePositionX += 0.5;
				
	}
	
	actionOnNaveAzul() {
		if(!naveazullock){
			if(pillado == false){
				var nameinput = $('#nameinput');
				playername = nameinput.val();
				if(playername !== ''){
					var x = 0;
					while((x < arrayNombres.length)&&(permitido)&&(arrayNombres[x]!=null)){
						if(arrayNombres[x] == playername){ 
							permitido = false;
							console.log('nombre ya existente');
						}else{
							permitido = true;
						}
						x++;
					}
					if(permitido){
						console.log(playername);
						nave = 1;
						this.shipIndex1 = 1;
						this.shipIndex2 = 2;
						createPlayer();
					}else{
						permitido = true;
						this.noNombrevalido.alpha = 1;
						this.time.addEvent({ delay: 2000, callback: function () {
						this.noNombrevalido.alpha = 0;
						}, callbackScope: this, loop: false });
						console.log('nombre no valido');
					}
				}else{
					noNombre.alpha = 1;
					this.time.addEvent({ delay: 2000, callback: function () {
					noNombre.alpha = 0;
					}, callbackScope: this, loop: false });
					console.log('nombre vacio');
				}
			}else{
				this.yaseleccionado.alpha = 1;
				this.time.addEvent({ delay: 2000, callback: function () {
				this.yaseleccionado.alpha = 0;
				}, callbackScope: this, loop: false });
			}
		}else{
			this.navedisponible.alpha = 1;
			this.time.addEvent({ delay: 2000, callback: function () {
			this.navedisponible.alpha = 0;
			}, callbackScope: this, loop: false });	
		}
	}
	
	actionOnNaveRosa() {
		if(!naverosalock){
			if(pillado == false){
				var nameinput = $('#nameinput');
				playername = nameinput.val();
				if(playername !== ''){
					var x = 0;
					while((x < arrayNombres.length)&&(permitido)&&(arrayNombres[x]!=null)){
						if(arrayNombres[x] == playername){
							permitido = false;
							console.log('nombre ya existente');
						}else{
							permitido = true;
						}
						x++;
					}
					if(permitido){
						console.log(playername);
						nave = 2;
						this.shipIndex1 = 2;
						this.shipIndex2 = 1;
						createPlayer();
					}else{
						permitido = true;
						this.noNombrevalido.alpha = 1;
						this.time.addEvent({ delay: 2000, callback: function () {
						this.noNombrevalido.alpha = 0;
						}, callbackScope: this, loop: false });
						console.log('nombre no valido');
					}
				}else{
					noNombre.alpha = 1;
					this.time.addEvent({ delay: 2000, callback: function () {
					noNombre.alpha = 0;
					}, callbackScope: this, loop: false });
					console.log('nombre vacio');
				}
			}else{
				this.yaseleccionado.alpha = 1;
				this.time.addEvent({ delay: 2000, callback: function () {
				this.yaseleccionado.alpha = 0;
				}, callbackScope: this, loop: false });
			}
		}else{
			this.navedisponible.alpha = 1;
			this.time.addEvent({ delay: 2000, callback: function () {
			this.navedisponible.alpha = 0;
			}, callbackScope: this, loop: false });	
		}
	}
	/*
	actionOnNaveVerde() {
		if(!naveverdelock){
			if(pillado == false){
				var nameinput = $('#nameinput');
				playername = nameinput.val();
				if(playername !== ''){
					var x = 0;
					while((x < arrayNombres.length)&&(permitido)&&(arrayNombres[x]!=null)){
						if(arrayNombres[x] == playername){
							permitido = false;
							console.log('nombre ya existente');
						}else{
							permitido = true;
							break;
						}
					}
					if(permitido){
						console.log(playername);
						nave = 3;
						this.shipIndex1 = 3;
						this.shipIndex2 = 2;
						createPlayer();
					}else{
						permitido = true;
						console.log('nombre no valido');
					}
				}else{
					console.log('nombre vacio');
				}
			}
		}
	}
	*/
	refresco(){
		naveazullock = false;
		naverosalock = false;
		//naveverdelock = false;
		
			for(var i = 0; i < playersonline; i++){
				if(playerslist[i].nave == 1){
					naveazullock = true;
				}else if(playerslist[i].nave == 2){
					naverosalock = true;
				}
				//else if(playerslist[i].nave == 3){
				//	naveverdelock = true;
				//}
			}
			
			if ((playersonline > 0)&&(pillado)){
				console.log('entro');
				if (numjugadoreslistos == 2){
					console.log('hola?');
					esperandoJugador.alpha = 0;
					entrandopartida.alpha = 1;
					this.idAux = id;
					this.time.addEvent({delay: 2000, callback: function(){
							this.reiniciar();
							this.scene.start(sceneManager.SCENES.ONLINEGAME, { shipIndex1: this.shipIndex1, shipIndex2: this.shipIndex2, efSound: this.efecsound, efvol: this.efvol, idAux: this.idAux });
						}, callbackScope: this, loop: false });
				}else if(playersonline == 1){
						entrandopartida.alpha = 0;
						esperandoJugador.alpha = 1;	
						console.log('esperando otro jugador');
				}
			}
			
			this.conectadosNum.setText('Jugadores conectados: ' + playersonline);			
			playersnum=playersonline;		
	}

	actnaves(){
		if((playersonline == 1)&&(!pillado)){
				if(playerslist[0].nave == 1){
					naveazul.alpha = 0.5;
					naverosa.alpha = 1;
					//naveverde.alpha = 1;
				}else if(playerslist[0].nave == 2){
					naveazul.alpha = 1;
					naverosa.alpha = 0.5;
					//naveverde.alpha = 1;
				}
				//else if(playerslist[0].nave == 3){
				//	naveazul.alpha = 1;
				//	naverosa.alpha = 1;
				//	naveverde.alpha = 0.3;
				//}
			}else if((playersonline == 1)&&(pillado)) {
				if(playerslist[0].nave == 1){
					naveazul.alpha = 1;
					naverosa.alpha = 0.5;
					//naveverde.alpha = 0.5;
				}else if(playerslist[0].nave == 2){
					naveazul.alpha = 0.5;
					naverosa.alpha = 1;
					//naveverde.alpha = 0.5;
				}
				//else if(playerslist[0].nave == 3){
					//naveazul.alpha = 0.5;
					//naverosa.alpha = 0.5;
					//naveverde.alpha = 1;
				//}
			}else if(playersonline == 2){
				if(playerslist[0].nave == nave){
					naveazul.alpha = 1;
					naverosa.alpha = 0.5;
					//naveverde.alpha = 0.5;
				}else{
					naveazul.alpha = 0.5;
					naverosa.alpha = 1;
					//naveverde.alpha = 0.5;
				}
			}else if(playersonline == 0){
				naveazul.alpha = 1;
				naverosa.alpha = 1;
				//naveverde.alpha = 1;
			}
	}
	
	actplayers(){
		if((playersonline == 1)&&(!pillado)){
				if(playerslist[0].nave == 1){
					this.navetext1.setText(playerslist[0].nombre);
					this.navetext2.setText('');
				}else if(playerslist[0].nave == 2){
					this.navetext1.setText('');
					this.navetext2.setText(playerslist[0].nombre);
				}
			}else if((playersonline == 1)&&(pillado)) {
				if(playerslist[0].nave == 1){
					this.navetext1.setText(playername);
					this.navetext2.setText('');
				}else if(playerslist[0].nave == 2)
				{
					this.navetext1.setText('');
					this.navetext2.setText(playername);
				}
			}else if(playersonline == 2){
				if(playerslist[0].nave == 1){
					this.navetext1.setText(playerslist[0].nombre);
					this.navetext2.setText(playerslist[1].nombre);
				}else if(playerslist[0].nave == 2){
					this.navetext1.setText(playerslist[1].nombre);
					this.navetext2.setText(playerslist[0].nombre);
				}
			}else if(playersonline == 0){
				this.navetext1.setText('');
				this.navetext2.setText('');
			}
	}

	reiniciar ()
		{			
			pillado = false;
			refrescar = false;
			naveazullock = false;
			naverosalock = false;
			permitido = true;
			//naveverdelock = false;
			playersonline = 0;
			playersnum = 0;
			id = 0;
			nave = 0;			
			playername = null;
			playerslist = null;
			servercaido = false;
			naveazul.alpha = 1;
			naverosa.alpha = 1;
			this.navetext1.setText('');
			this.navetext2.setText('');
			document.getElementById('nameinput').style.display = 'none' ;
			document.getElementById('textinput').style.display = 'none';
			document.getElementById('send-button').style.display = 'none';
			document.getElementById('chat').style.display = 'none';
		}
		
	
	PlayersOnline () {
		$.ajax({
			method: 'GET',
			url: 'http://localhost:8080/players/',
			success: function(players) {
				var numAux = 0;
				playersonline = players.length;
				numjugadoreslistos = 0;
				for (var i = 0; i<players.length; i++){
					if(players[i].listo){
						numAux++;
					}
				}
				
				if( (playersnum !== playersonline)||(numAux != numjugadoreslistos)) {
					playerslist = players;
					numjugadoreslistos = numAux;
					refrescar = true;
				}
				else {
					refrescar = false;
				}
			}
		}).fail(function() {
			servercaido = true;
		})
	}
	
	EscribirChat(){
		$.ajax({
			method: 'GET',
			url: 'http://localhost:8080/chat',
			success: function(messages) {
				mensajes = messages;
				//console.log(mensajes);
			}
		}).fail(function() {
			servercaido = true;
		})
	}
		
}

function createPlayer() {
	$.ajax({
		method: "POST",
		url: 'http://localhost:8080/players',
		data: JSON.stringify({ "nombre": playername, "conectado": true, "nave": nave, "listo": false }),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		},
		success: function () {
			if (playersonline == 1) {
				esperandoJugador.alpha = 1; 
				console.log ('un jugador');
			}
			else if (playersonline == 2) {
				esperandoJugador.alpha = 0;
				entrandopartida.alpha = 1;	
				console.log ('un jugador');
			}

			pillado = true;
		}
	}).done(function (id1) {
		id = id1;
		console.log(id);
		writePlayer();
	})
}

function updatePlayer(){
	$.ajax({
		method: "PUT",
		url: 'http://localhost:8080/players/' + id ,
		data: JSON.stringify({ "listo": true }),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		},
		success: function () {
			console.log('modificado');
		}
	})
}

function writePlayer() {
	$.ajax({
		method: "GET",
		url: 'http://localhost:8080/players/' + id
	})
}

function leerFichero() {
	$.ajax({
		method: 'GET',
		url: 'http://localhost:8080/playerslog'
	}).done(function (listaAux) {
		arrayNombres = listaAux;
	})
}

function deletePlayerRoom() {
	$.ajax({
		method: 'DELETE',
		url: 'http://localhost:8080/players/' + id
	})
}

//CHAT
function escribir(){
	if((playername != null)&&(playersonline >0)){
		cuerpo = document.getElementById('textinput').value;
		document.getElementById('textinput').value = "";
		writeMessage();
		} else {
			noNombre.alpha = 1;
			this.time.addEvent({ delay: 2000, callback: function () {
			noNombre.alpha = 0;
			}, callbackScope: this, loop: false });			
			console.log ('introduce un nombre primero');
		}
	}
	
function writeMessage(){
	$.ajax({
		method: "POST",
		url: 'http://localhost:8080/chat',
		data: JSON.stringify({ "nombre": playername, "cuerpo": cuerpo}),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		},
	})
}

window.onbeforeunload = function () {
	deletePlayerRoom();
	return null;
}


