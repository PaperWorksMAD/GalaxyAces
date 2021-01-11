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
var naveverdelock = false;

var timerjugadores;
var id;
var permitido = true;

var naverosa;
var naveazul;
var naveverde;

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
		this.texto = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.90, "seleccion").setDepth(2).setScale(0.5);
		this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondomenu').setDepth(0);
		this.add.image(this.game.renderer.width / 2 - 100, this.game.renderer.height * 0.20, "titulo").setDepth(1);
		this.imgcaido = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2, "caido").setDepth(10);
		this.imgcaido.alpha = 0;
		
		//Texto
		this.conectadosNum = this.add.text(500, 200, 'Jugadores conectados: ', { font: '26px Courier', fill: '#ffffff' });
		this.conectadosNum.setScale(0.75);

		this.jugador = 1
		this.shipIndex1 = 0;
		this.shipIndex2 = 0;

		naverosa = this.add.image(this.game.renderer.width / 2 - 100, 350, 'nave2').setDepth(1).setInteractive();
		naveazul = this.add.image(this.game.renderer.width / 2 - 150 - 100, 350, 'nave3').setDepth(1).setInteractive();
		naveverde = this.add.image(this.game.renderer.width / 2 + 150 - 100, 350, 'nave4').setDepth(1).setInteractive();

		naveazul.on("pointerup",()=> this.actionOnNaveAzul());
		naverosa.on("pointerup",()=> this.actionOnNaveRosa());
		naveverde.on("pointerup",()=> this.actionOnNaveVerde());
		
		let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(2);
		xbt.setInteractive();
		xbt.on("pointerup", () => {
			deletePlayerRoom();
			this.reiniciar();
			this.scene.start(sceneManager.SCENES.MAINMENU, { efSound: this.efecsound, efvol: this.efvol });
		})
/*
		nave2.on("pointerup", () => {
			if (this.jugador === 1) {
				this.shipIndex1 = 2;
				this.jugador++;
			} else if (this.jugador === 2 && this.shipIndex1 != 2) {
				this.shipIndex2 = 2;
				this.jugador++;
			}
		})

		nave3.on("pointerup", () => {
			if (this.jugador === 1) {
				this.shipIndex1 = 3;
				this.jugador++;
			} else if (this.jugador === 2 && this.shipIndex1 != 3) {
				this.shipIndex2 = 3;
				this.jugador++;
			}
		})

		nave4.on("pointerup", () => {
			if (this.jugador === 1) {
				this.shipIndex1 = 4;
				this.jugador++;
			} else if (this.jugador === 2 && this.shipIndex1 != 4) {
				this.shipIndex2 = 4;
				this.jugador++;
			}
		})
*/
		
		document.getElementById('nameinput').style.display = 'block';
		
		timerjugadores = this.time.addEvent({ delay: 1000, callback: this.PlayersOnline, callbackScope: this, loop: true });
		
		this.time.addEvent({ delay: 1000, callback: leerFichero, callbackScope: this, loop: true });

	}
	
	update() {
		if(refrescar){
			this.refresco();
			this.actnaves();
			refrescar = false;
		}
		
		if (servercaido) {
			console.log('server desconectado');
			servercaido = false;
			timerjugadores.remove(false);
			document.getElementById('nameinput').style.display = 'none' ;
			this.imgcaido.alpha = 1;
			deletePlayerRoom();
			this.time.addEvent({ delay: 6000, callback: function () {
				this.scene.start(sceneManager.SCENES.MAINMENU, { efSound: this.efecsound, efvol: this.efvol });
			}, callbackScope: this, loop: false });
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
							break;
						}
					}
					if(permitido){
						console.log(playername);
						nave = 1;
						this.shipIndex1 = 2;
						this.shipIndex2 = 3;
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
							break;
						}
					}
					if(permitido){
						console.log(playername);
						nave = 2;
						this.shipIndex1 = 3;
						this.shipIndex2 = 4;
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
						this.shipIndex1 = 4;
						this.shipIndex2 = 3;
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
	
	refresco(){
		naveazullock = false;
		naverosalock = false;
		naveverdelock = false;
		
			for(var i = 0; playersonline > i; i++ )
			{
				if(playerslist[i].nave == 1)
				{
					naveazullock = true;
				} 
				else if(playerslist[i].nave == 2)
				{
					naverosalock = true;
				}
				else if(playerslist[i].nave == 3)
				{
					naveverdelock = true;
				}
			}

			if ((playersonline > 0)&&(pillado))
			{
				if (playersonline == 2)
				{
					this.time.addEvent({delay: 2000, callback: function()
						{
							this.reiniciar();
							this.scene.start(sceneManager.SCENES.GAME, { shipIndex1: this.shipIndex1, shipIndex2: this.shipIndex2, efSound: this.efecsound, efvol: this.efvol });
						}, callbackScope: this, loop: false });
				} 
				else if(playersonline == 1)
				{
					if(playerslist[0].nave == 1)
					{
						console.log('esperando otro jugador');
					} 
					else if(listaJugadores[0].personaje == 2)
					{
						console.log('esperando otro jugador');
					}
				}
			}
			
			this.conectadosNum.setText('Jugadores conectados: ' + playersonline);			
			playersnum=playersonline;		
	}
	
	actnaves(){
		if((playersonline == 1)&&(!pillado))
			{
				if(playerslist[0].nave == 1)
				{
					naveazul.alpha = 0.3;
					naverosa.alpha = 1;
					naveverde.alpha = 1;
				} 
				else if(playerslist[0].nave == 2)
				{
					naveazul.alpha = 1;
					naverosa.alpha = 0.3;
					naveverde.alpha = 1;
				}
				else if(playerslist[0].nave == 3)
				{
					naveazul.alpha = 1;
					naverosa.alpha = 1;
					naveverde.alpha = 0.3;
				}
			}
			else if((playersonline == 1)&&(pillado)) 
			{
				if(playerslist[0].nave == 1)
				{
					naveazul.alpha = 1;
					naverosa.alpha = 0.5;
					naveverde.alpha = 0.5;
				} 
				else if(playerslist[0].nave == 2)
				{
					naveazul.alpha = 0.5;
					naverosa.alpha = 1;
					naveverde.alpha = 0.5;
				}
				else if(playerslist[0].nave == 3)
				{
					naveazul.alpha = 0.5;
					naverosa.alpha = 0.5;
					naveverde.alpha = 1;
				}
			}
			else if(playersonline == 2)
			{
				if(playerslist[0].nave == nave)
				{
					naveazul.alpha = 1;
					naverosa.alpha = 0.5;
					naveverde.alpha = 0.5;
				} 
				else if(playerslist[0].nave == nave++)
				{
					naveazul.alpha = 0.5;
					naverosa.alpha = 1;
					naveverde.alpha = 0.5;
				}
				else{
					naveazul.alpha = 0.5;
					naverosa.alpha = 0.5;
					naveverde.alpha = 1;
				}
			}
			else if(playersonline == 0)
			{
				naveazul.alpha = 1;
				naverosa.alpha = 1;
				naveverde.alpha = 1;
			}
	}

	
	reiniciar ()
		{
			playersonline = 0;
			playersnum = 0;
			id = 0;
			nave = 0;
			
			pillado = false;
			refrescar = false;
			naveazullock = false;
			naverosalock = false;
			naveverdelock = false;
		
			
			playername = null;
			playerslist = null;
			servercaido = false;
			
			document.getElementById('nameinput').style.display = 'none' ;
		}
	
	PlayersOnline () {
		$.ajax({
			method: 'GET',
			url: 'http://localhost:8080/players/',
			success: function(players) {
				playersonline = players.length;

				if (playersnum !== playersonline) {
					playerslist = players;
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
		
}

function createPlayer() {
	$.ajax({
		method: "POST",
		url: 'http://localhost:8080/players',
		data: JSON.stringify({ "nombre": playername, "conectado": true, "nave": nave }),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		},
		success: function () {
			if (playersonline == 1) {
				console.log ('un jugador');
			}
			else if (playersonline == 2) {
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

window.onbeforeunload = function () {
	deletePlayerRoom();
	return null;
}

