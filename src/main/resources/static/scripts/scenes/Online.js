import { sceneManager } from "../sceneManager.js";

var playersonline;
var playersnum = 0;
var playerslist;

var refrescar = false;

var servercaido = false;

var playername;
var nave;

var arrayNombres;

var pillado = false;

var timerjugadores;
var id;

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

		//Texto
		this.add.text(500, 200, 'Enter text:', { font: '32px Courier', fill: '#ffffff' });
		var textEntry = this.add.text(500, 250, '', { font: '32px Courier', fill: '#ffff00' });


		this.input.keyboard.on('keydown', function(event) {

			if (event.keyCode === 8 && textEntry.text.length > 0) {
				textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
			}
			else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
				textEntry.text += event.key;
			} else if (event.keyCode === 13) {
				textEntry.text += "\n";
			}

		});

		this.jugador = 1
		this.shipIndex1 = 0;
		this.shipIndex2 = 0;

		let nave2 = this.add.image(this.game.renderer.width / 2 - 100, 350, 'nave2').setDepth(1).setInteractive();
		let nave3 = this.add.image(this.game.renderer.width / 2 - 150 - 100, 350, 'nave3').setDepth(1).setInteractive();
		let nave4 = this.add.image(this.game.renderer.width / 2 + 150 - 100, 350, 'nave4').setDepth(1).setInteractive();

		let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(2);
		xbt.setInteractive();
		xbt.on("pointerup", () => {
			this.scene.start(sceneManager.SCENES.MAINMENU, { efSound: this.efecsound, efvol: this.efvol });
		})

		this.input.keyboard.on('keydown-SPACE', this.handleContinue, this);

		nave2.on("pointerover", () => {
			if (this.jugador === 1) {
				nave2.setTint(0xefb810);
			} else if (this.jugador === 2 && this.shipIndex1 != 2) {
				nave2.setTint(0x3b83bd);
			}
		})

		nave2.on("pointerout", () => {
			if (this.shipIndex1 != 2 && this.shipIndex2 != 2)
				nave2.clearTint();
		})

		nave2.on("pointerup", () => {
			if (this.jugador === 1) {
				this.shipIndex1 = 2;
				this.jugador++;
			} else if (this.jugador === 2 && this.shipIndex1 != 2) {
				this.shipIndex2 = 2;
				this.jugador++;
			}
		})


		nave3.on("pointerover", () => {
			if (this.jugador === 1) {
				nave3.setTint(0xefb810);
			} else if (this.jugador === 2 && this.shipIndex1 != 3) {
				nave3.setTint(0x3b83bd);
			}
		})

		nave3.on("pointerout", () => {
			if (this.shipIndex1 != 3 && this.shipIndex2 != 3)
				nave3.clearTint();
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



		nave4.on("pointerover", () => {
			if (this.jugador === 1) {
				nave4.setTint(0xefb810);
			} else if (this.jugador === 2 && this.shipIndex1 != 4) {
				nave4.setTint(0x3b83bd);
			}
		})

		nave4.on("pointerout", () => {
			if (this.shipIndex1 != 4 && this.shipIndex2 != 4)
				nave4.clearTint();
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
		
		timerjugadores = this.time.addEvent({ delay: 1000, callback: this.PlayersOnline, callbackScope: this, loop: true });
		
		this.time.addEvent({ delay: 1000, callback: leerFichero, callbackScope: this, loop: true });

	}
	
	update() {
		if(refrescar){
			
			refrescar = false;
		}
		
		if (servercaido) {
			console.log('server desconectado');
			servercaido = false;
			timerjugadores.remove(false);
			deletePlayerRoom();
			this.time.addEvent({ delay: 6000,callback: function () {
				this.scene.start(sceneManager.SCENES.MAINMENU, { efSound: this.efecsound, efvol: this.efvol });
			}, callbackScope: this, loop: false });
		}
		
		this.fondo.tilePositionX += 0.5;
		
		if (this.jugador >= 3) {
			this.texto.setVisible(0);
			this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.90, "presionaespacio").setDepth(2).setScale(0.5);
		}
		
	}

	handleContinue() {
		if (this.jugador >= 3) {
			this.scene.start(sceneManager.SCENES.GAME, { shipIndex1: this.shipIndex1, shipIndex2: this.shipIndex2, efSound: this.efecsound, efvol: this.efvol });
		}
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

