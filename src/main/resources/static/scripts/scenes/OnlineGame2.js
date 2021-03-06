import { sceneManager } from "../sceneManager.js";

var bullets;
var bullets2;
var explosions;
var speed;
var lastFired = 0;

var id;
var servercaido = false;
var playersonline;
var timerevent;

var connection;

var tween;

var newy = 500;
var newx = 550;

var disparando = false;
var disparandoaux = false;
var enemx = 0;
var enemy = 0;
var tipoenemigo;

var actenemigos = false;

export class OnlineGame2 extends Phaser.Scene {
	constructor() {
		super({
			key: sceneManager.SCENES.ONLINEGAME2
		})
	}

	init(data) {
		this.shipIndex1 = data.shipIndex1;
		this.shipIndex2 = data.shipIndex2;
		this.efSound = data.efSound;
		this.efvol = data.efvol;
		id = data.idAux
		connection = data.conexion;
	}

	onEvent() {
		this.initialTime -= 1; // One second
		this.text.setText(this.formatTime(this.initialTime));
	}
	onEvent2() {
		console.log("final");
		deleteplayer();
		borrarsocket();
		this.scene.start(sceneManager.SCENES.SCORE, { score: this.jugador1.puntuacion, score2: this.jugador2.puntuacion, enemigos1: this.jugador1.bajas, enemigos2: this.jugador2.bajas, efSound: this.efSound, efvol: this.efvol });
	}

	formatTime(seconds) {
		// Minutes
		var minutes = Math.floor(seconds / 60);
		// Seconds
		var partInSeconds = seconds % 60;
		// Adds left zeros to seconds
		partInSeconds = partInSeconds.toString().padStart(2, '0');
		// Returns formated time
		return `${minutes}:${partInSeconds}`;
	}


	create() {
		
		
		
		console.log(this.efvol);
		console.log("online2");
		console.log(connection);

		connection.onclose = function() {
			console.log("cerrado");
			servercaido = true;
		}

		connection.onmessage = function(msg) {

			console.log("mensaje: " + msg.data);

			var message = JSON.parse(msg.data)

			switch (message.name) {
				case "actpos":
					console.log(message.message);
					newx = parseInt(message.x);
					newy = parseInt(message.y);
					console.log(newx);
					console.log(newy);
					break;
				case "disparar":
					if(message.message == "disparando"){
						disparando = true;
					}else if (message.message == "nodisparando"){
						disparando = false;
					}
					break;
				case "actenemigos":
					enemx = parseInt(message.x);
					enemy = parseInt(message.y);
					console.log(enemx);
					console.log(enemy);
					actenemigos = true;
					if(message.message == "enemigo1"){
						tipoenemigo = 1;
					}else if(message.message == "enemigo2"){
						tipoenemigo = 2;
					}else if(message.message == "enemigo3"){
						tipoenemigo = 3;
					};
					console.log(tipoenemigo);
					console.log(actenemigos);
					break;
			}
		}

		//Animaciones
		this.anims.create({ key: 'Exhaust2', frames: this.anims.generateFrameNumbers('exhaust2'), frameRate: 6, yoyo: false, repeat: -1 });
		this.anims.create({ key: 'Exhaust3', frames: this.anims.generateFrameNumbers('exhaust3'), frameRate: 6, yoyo: false, repeat: -1 });
		this.anims.create({ key: 'Exhaust4', frames: this.anims.generateFrameNumbers('exhaust4'), frameRate: 6, yoyo: false, repeat: -1 });
		this.anims.create({ key: 'EnemyAnim', frames: this.anims.generateFrameNumbers('enemy'), frameRate: 2, yoyo: false, repeat: -1 });
		this.anims.create({ key: 'EnemyAnim3', frames: this.anims.generateFrameNumbers('enemy3'), frameRate: 2, yoyo: false, repeat: -1 });

		this.anims.create({ key: 'AnimationBullet', frames: this.anims.generateFrameNumbers('bala6'), frameRate: 12, yoyo: true, repeat: -1 });
		this.anims.create({ key: 'AnimationExplosion', frames: this.anims.generateFrameNumbers('explosion'), frameRate: 20, yoyo: false, repeat: 0, hideOnComplete: true });

		//Efectos de sonido
		this.soundEnemy1 = this.sound.add('enemigo1', {
			volume: this.efvol
		});
		this.soundEnemy2 = this.sound.add('enemigo2', {
			volume: this.efvol
		});
		this.soundEnemy3 = this.sound.add('enemigo3', {
			volume: this.efvol
		});
		this.soundPlayers = this.sound.add('jugador', {
			volume: this.efvol
		});
		this.soundNormal = this.sound.add('normal', {
			volume: this.efvol
		});
		this.soundShoot = this.sound.add('shoot', {
			volume: this.efvol
		});

		//this.sound.setDecodedCallback([this.soundEnemy1, this.soundEnemy2, this.soundEnemy3, this.soundPlayers], start, this);

		
//Clase general
		class Entity extends Phaser.Physics.Arcade.Sprite {
			constructor(scene, x, y, key, type) {
				super(scene, x, y, key);
				this.scene = scene;
				this.scene.add.existing(this);
				this.scene.physics.world.enableBody(this, 0);
				this.setData("type", type);
				this.setData("isDead", false);
			}
		}
		
		class Enemigo extends Entity {
			constructor(scene, x, y, key, type) {
				super(scene, x, y, key, "Enemigo");
			}

			recibirDaño() {
				this.vida -= 1;

				if (this.vida <= 0) {
					this.setActive(false);
					this.setVisible(false);
					this.setPosition(-1000, -1000);
					console.log("muerto");
				}
			}

			mover(x, y) {
				this.setVelocity(x, y);
			}
		}

		class Enemigo1 extends Enemigo {
			constructor(scene, x, y, key, type) {
				super(scene, x, y, key, "Enemigo1");

				this.setScale(2).setDepth(1).setCollideWorldBounds(false).setBounce(1, 1).setRotation(3, 14159);
				this.anims.play('EnemyAnim');

				this.vida = 2;
				this.tipo = 1;
			}
		}

		class Enemigo2 extends Enemigo {
			constructor(scene, x, y, key, type) {
				super(scene, x, y, key, "Enemigo2");

				this.setScale(0.5).setDepth(1).setCollideWorldBounds(false).setBounce(1, 1).setRotation(3, 14159);

				this.vida = 4;
				this.tipo = 2;
			}

			update(time, delta) {
				this.rotation += 0.05;
			}
		}

		class Enemigo3 extends Enemigo {
			constructor(scene, x, y, key, type) {
				super(scene, x, y, key, "Enemigo3");

				this.setScale(1.5).setDepth(1).setCollideWorldBounds(false).setBounce(1, 1);
				this.anims.play('EnemyAnim3');

				this.vida = 1;
				this.tipo = 3;
			}
		}
		
		//Enemigos
		this.enemies = this.physics.add.group({
			classType: Enemigo,
			maxSize: 100,
			runChildUpdate: true
		});
		this.enemies.setDepth(5);

		class Bala extends Entity {

			constructor(scene, x, y, key, type) {
				super(scene, x, y, key, "Bala");
				this.setRotation(80);
				this.anims.play('AnimationBullet');
				this.jugador;

			}

			fire(x, y, i) {
				this.setSize(30, 30, true);
				this.setPosition(x, y - 50);
				this.setVelocity(0, -400);

				this.setActive(true);
				this.setVisible(true);

				this.jugador = i;
			}

			update(time, delta) {
				if (this.y < -500 || this.x < -500) {
					this.setActive(false);
					this.setVisible(false);
				}
			}


		}

		bullets = this.physics.add.group({
			classType: Bala,
			maxSize: 5,
			runChildUpdate: true,
		});

		bullets2 = this.physics.add.group({
			classType: Bala,
			maxSize: 5,
			runChildUpdate: true,
		});

		class Explosion extends Phaser.GameObjects.Sprite {
			constructor(scene, x, y, key, type) {
				super(scene, x, y, key, "explosion");
			}
			aparecer(x, y) {
				this.setPosition(x, y).setVisible(true).setActive(true);
				this.anims.play('AnimationExplosion');
			}
		}

		explosions = this.add.group({
			classType: Explosion,
			maxSize: 10,
			runChildUpdate: false,
			key: 'explosion'
		});


		class Jugador extends Entity {

			constructor(scene, x, y, key, type, game) {
				super(scene, x, y, key, "Jugador");

				this.setScale(0.5).setDepth(3).setCollideWorldBounds(true).setBounce(0.1, 0.1);

				//console.log(this);

				this.puntuacion = 0;
				this.bajas = 0;
				this.vidas = 3;
			}

			moveUp() {
				this.setVelocity(0, -100);
			}

			moveDown() {
				this.setVelocity(0, 100);
			}

			moveLeft() {
				this.setVelocity(-100, 0);
			}

			moveRight() {
				this.setVelocity(100, 0);
			}
		}

		


		speed = Phaser.Math.GetSpeed(300, 1);

		//Tiempo de partida en segundos
		this.initialTime = 60;
		this.muerto = 0;

		let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(20);
		xbt.setInteractive();
		xbt.on("pointerup", () => {
			deleteplayer();
			borrarsocket();
			this.scene.start(sceneManager.SCENES.MAINMENU);
		})

		this.imgcaido = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "caido").setDepth(30);
		this.imgcaido.alpha = 0;

		this.text = this.add.bitmapText(this.game.renderer.width / 2 - 32, 32, "bit", this.formatTime(this.initialTime), 24).setDepth(10);

		this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);
		this.fondo2 = this.add.tileSprite(600, 300, 800, 600, 'fondo2').setDepth(0);
		this.fondo3 = this.add.tileSprite(200, 300, 800, 600, 'fondo3').setDepth(0);
		//console.log(this);

		//Jugadores
		this.jugador1 = new Jugador(this, this.game.renderer.width / 2 + 150, this.game.renderer.height - 100, "nave" + this.shipIndex2).setDepth(5);
		this.jugador2 = new Jugador(this, this.game.renderer.width / 2 - 150, this.game.renderer.height - 100, "nave" + this.shipIndex1).setDepth(5);
		
		this.time.addEvent({
			delay: 100, callback: function() {
				var msg = { name: "actpos", message: "hola desde jugador2", x: this.jugador2.x, y: this.jugador2.y }
				connection.send(JSON.stringify(msg));
			}, callbackScope: this, loop: true
		});

		this.time.addEvent({
			delay: 100, callback: function() {
				this.tweens.add({
					targets: this.jugador1,
					duration: 100,
					y: newy,
					x: newx,
					ease: 'Linear'
				});
			}, callbackScope: this, loop: true
		});
		
		this.time.addEvent({
			delay: 50, callback: function() {
				if(disparandoaux){
					var msg = {name: "disparar", message:"disparando", x:0, y:0}
					connection.send(JSON.stringify(msg));
				}else if(!disparandoaux){
					var msg = {name: "disparar", message:"nodisparando", x:0, y:0}
					connection.send(JSON.stringify(msg));
				}
			}, callbackScope: this, loop: true
		});
		
		this.time.addEvent({
			delay: 120, callback: function() {
				if (actenemigos){
				console.log("hola?");
				if(tipoenemigo == 1){
						this.enemy = new Enemigo1(this, enemx, enemy, 'enemy');
						this.enemies.add(this.enemy);
						actenemigos = false;
					}else if(tipoenemigo == 3){
						this.enemy = new Enemigo3(this,enemx, enemy, 'enemy3');
						this.enemies.add(this.enemy);
						actenemigos = false;
					}else if(tipoenemigo == 2){
						this.enemy = new Enemigo2(this,enemx, enemy, 'enemy2');
						this.enemies.add(this.enemy);
						actenemigos = false;
					}
				}
			}, callbackScope: this, loop: true
		});
		
		this.j1puntos = this.add.bitmapText(this.game.renderer.width * 0.85, 568, "bit", "J1: " + this.jugador1.puntuacion, 24).setDepth(10);
		this.j2puntos = this.add.bitmapText(this.game.renderer.width * 0.05, 568, "bit", "J2: " + this.jugador2.puntuacion, 24).setDepth(10);

		this.cursor = this.input.keyboard.createCursorKeys();
		this.keys = this.input.keyboard.addKeys('A,W,S,D');
		this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

		this.rivalout = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "rivalout").setDepth(30);
		this.rivalout.setScale(0.75);
		this.rivalout.alpha = 0;

		this.j1v1 = this.add.image(this.game.renderer.width * 0.82, 580, "corazon").setDepth(20);
		this.j1v2 = this.add.image(this.game.renderer.width * 0.78, 580, "corazon").setDepth(20);
		this.j1v3 = this.add.image(this.game.renderer.width * 0.74, 580, "corazon").setDepth(20);
		this.j1v1.setScale(0.1);
		this.j1v2.setScale(0.1);
		this.j1v3.setScale(0.1);

		this.j2v1 = this.add.image(this.game.renderer.width * 0.23, 580, "corazon").setDepth(20);
		this.j2v2 = this.add.image(this.game.renderer.width * 0.27, 580, "corazon").setDepth(20);
		this.j2v3 = this.add.image(this.game.renderer.width * 0.31, 580, "corazon").setDepth(20);
		this.j2v1.setScale(0.1);
		this.j2v2.setScale(0.1);
		this.j2v3.setScale(0.1);

		this.exAux1;
		this.esAux2;
		if (this.shipIndex1 == 2)
			this.esAux1 = 40;
		if (this.shipIndex1 == 3)
			this.esAux1 = 35;
		if (this.shipIndex1 == 4)
			this.esAux1 = 30;
		if (this.shipIndex2 == 2)
			this.esAux2 = 40;
		if (this.shipIndex2 == 3)
			this.esAux2 = 35;
		if (this.shipIndex2 == 4)
			this.esAux2 = 30;

		this.exhaust1 = this.add.sprite(this.jugador1.x, this.jugador1.y + this.esAux1, 'exhaust' + this.shipIndex1).setDepth(2).setRotation(-80).setScale(1.2);
		this.exhaust1.setVisible(false);
		this.exhaust1.anims.play('Exhaust' + this.shipIndex1);

		this.exhaust2 = this.add.sprite(this.jugador2.x, this.jugador2.y + this.esAux2, 'exhaust' + this.shipIndex2).setDepth(2).setRotation(-80).setScale(1.2);
		this.exhaust2.setVisible(false);
		this.exhaust2.anims.play('Exhaust' + this.shipIndex2);

	
		/*this.time.addEvent({
			delay: 700,
			callback: function() {
				var aux = Phaser.Math.Between(0, 100);
				if (aux < 50) {
					this.enemy = new Enemigo1(this, Phaser.Math.Between(15, this.game.config.width - 15), 0, 'enemy');
					this.enemies.add(this.enemy);
				} else if (aux >= 50 && aux < 75) {
					this.enemy = new Enemigo3(this, Phaser.Math.Between(15, this.game.config.width - 15), 0, 'enemy3');
					this.enemies.add(this.enemy);
				} else {
					this.enemy = new Enemigo2(this, Phaser.Math.Between(15, this.game.config.width - 15), 0, 'enemy2');
					this.enemies.add(this.enemy);
				}

			},
			callbackScope: this,
			loop: true
		});*/
		
		//console.log(this.enemies);

		//Deteccion de colisiones
		//Entre jugadores
		this.physics.add.collider(this.jugador1, this.jugador2);
		//Entre enemigo y jugadores
		this.physics.add.collider(this.enemies, [this.jugador1, this.jugador2], this.collissionHandlerJugador, null, this);
		//Entre balas y enemigos
		this.physics.add.collider(this.enemies, [bullets, bullets2], this.collissionHandlerEnemy, null, this);
		//Entre balas y jugadores
		this.physics.add.collider(this.jugador1, [bullets, bullets2], this.collissionHandler, null, this);
		this.physics.add.collider(this.jugador2, [bullets, bullets2], this.collissionHandler, null, this);

		//Timer de partida y cuenta atras
		this.tiempo = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
		this.tiempopartida = this.time.delayedCall(this.initialTime * 1000, this.onEvent2, [], this);

		timerevent = this.time.addEvent({ delay: 1000, callback: this.PlayersOnline, callbackScope: this, loop: true });


		//this.time.addEvent({ delay: 1000, callback: function () {
		//var msg = {
		//name: "actpos",
		//x: this.jugador2.x,
		//y: this.jugador2.y
		//}
		//connection.send(JSON.stringify(msg));
		//}, callbackScope: this, loop: true });
	}

	PlayersOnline() {
		$.ajax({
			method: 'GET',
			url: 'http://localhost:8080/players/',
			success: function(players) {
				playersonline = players.length;
			}
		}).fail(function() {
			servercaido = true;
		})
		console.log(playersonline);
		if (playersonline == 1) {
			this.rivalout.alpha = 1;
			deleteplayer();
			borrarsocket();
			this.time.addEvent({ delay: 3000, callback: function() { this.scene.start(sceneManager.SCENES.MAINMENU, { efSound: this.efecsound, efvol: this.efvol }); }, callbackScope: this, loop: false });
		}
	}

	update(time, delta) {
		if (this.jugador2.vidas == 2) {
			this.j2v3.setVisible(false).setActive(false);
		}
		if (this.jugador1.vidas == 2) {
			this.j1v3.setVisible(false).setActive(false);
		}

		if (this.jugador2.vidas == 1) {
			this.j2v2.setVisible(false).setActive(false);
		}
		if (this.jugador1.vidas == 1) {
			this.j1v2.setVisible(false).setActive(false);
		}

		this.enemies.setVelocity(0, 150);

		this.j1puntos.setText("J1: " + this.jugador1.puntuacion);
		this.j2puntos.setText("J2: " + this.jugador2.puntuacion);

		this.jugador1.setVelocity(0);
		this.jugador2.setVelocity(0);
		this.exhaust1.setVisible(false);
		this.exhaust2.setVisible(false);

		if (this.keys.A.isDown) {
			this.jugador2.moveLeft();
			this.exhaust2.setX(this.jugador2.x).setVisible(true);
		}
		else if (this.keys.D.isDown) {
			this.jugador2.moveRight();
			this.exhaust2.setX(this.jugador2.x).setVisible(true);
		}

		if (this.keys.W.isDown) {
			this.jugador2.moveUp();
			this.exhaust2.setY(this.jugador2.y + this.esAux2).setVisible(true);
		}
		else if (this.keys.S.isDown) {
			this.jugador2.moveDown();
			this.exhaust2.setY(this.jugador2.y + this.esAux2).setVisible(true);
		}
		this.fondo.tilePositionY -= 1;
		this.fondo2.tilePositionY -= 0.5;
		this.fondo3.tilePositionY -= 0.2;

		if (this.spaceBar.isDown && time > lastFired) {
			console.log("disparo");
			disparandoaux = true; 
			var bullet = bullets.get();

			if (bullet) {
				bullet.fire(this.jugador2.x, this.jugador2.y, 2);

				if (this.efSound)
					this.soundShoot.play();

				lastFired = time + 100;
			}
		}else if (this.spaceBar.isUp){
			disparandoaux = false;
		}
		
		if (disparando && time > lastFired) {
			console.log("disparo");
			var bullet = bullets2.get();

			if (bullet) {
				bullet.fire(this.jugador1.x, this.jugador1.y, 1);

				if (this.efSound)
					this.soundShoot.play();

				lastFired = time + 100;
			}
		}

		if (this.jugador1.vidas <= 0 || this.jugador2.vidas <= 0) {
			if (this.jugador1.vidas <= 0) {
				this.muerto = 1;
			} else {
				this.muerto = 2;
			}
			deleteplayer();
			borrarsocket();
			this.scene.start(sceneManager.SCENES.SCORE, { score: this.jugador1.puntuacion, score2: this.jugador2.puntuacion, enemigos1: this.jugador1.bajas, enemigos2: this.jugador2.bajas, muerto: this.muerto, efSound: this.efSound, efvol: this.efvol });
		}

		if (servercaido) {
			servercaido = false;
			timerevent.remove(false);
			this.imgcaido.alpha = 1;
			deleteplayer();
			borrarsocket();
			this.time.addEvent({ delay: 3000, callback: function() { this.scene.start(sceneManager.SCENES.MAINMENU, { efSound: this.efecsound, efvol: this.efvol }); }, callbackScope: this, loop: false });
		}
	}

	collissionHandler(obj1, obj2) {
		console.log("colision");
		if (this.efSound)
			this.soundNormal.play();
		obj1.setVelocity(0);
		obj2.setActive(false).setVisible(false).setPosition(-5000, -5000);

	}

	collissionHandlerJugador(obj1, obj2) {
		console.log("colision");
		if (this.efSound)
			this.soundPlayers.play();
		obj1.setVelocity(0);
		obj1.vidas -= 1;
		obj2.setActive(false).setVisible(false).setPosition(-5000, -5000);

	}

	collissionHandlerEnemy(obj1, obj2) {
		console.log("colision con enemigo");
		if (this.efSound)
			this.soundNormal.play();
		obj1.setVelocity(0);
		//obj2.play('AnimationExplosion');
		//obj2.setScale(0.8).setVelocity(0);

		var expl = explosions.get();
		if (expl) {
			expl.aparecer(obj1.x, obj1.y);

			this.time.addEvent({
				delay: 800,
				callback: function() {
					expl.setActive(false).setVisible(false);
				},
			});
		}


		//Recibir daño
		obj1.recibirDaño();

		if (obj1.vida <= 0) {
			if (obj2.jugador == 1) {
				if (obj1.tipo == 1) {
					this.jugador1.puntuacion += 10;
					if (this.efSound)
						this.soundEnemy1.play();
				} else if (obj1.tipo == 2) {
					this.jugador1.puntuacion += 30;
					if (this.efSound)
						this.soundEnemy2.play();
				} else if (obj1.tipo == 3) {
					this.jugador1.puntuacion += 5;
					if (this.efSound)
						this.soundEnemy3.play();
				}
				this.jugador1.bajas += 1;
				console.log(this.jugador1.puntuacion);
			} else {
				if (obj1.tipo == 1) {
					this.jugador2.puntuacion += 10;
					if (this.efSound)
						this.soundEnemy1.play();
				} else if (obj1.tipo == 2) {
					this.jugador2.puntuacion += 30;
					if (this.efSound)
						this.soundEnemy2.play();
				} else if (obj1.tipo == 3) {
					this.jugador2.puntuacion += 5;
					if (this.efSound)
						this.soundEnemy3.play();
				}
				this.jugador2.bajas += 1;
				console.log(this.jugador2.puntuacion);
			}
		}

		obj2.setPosition(-500, -500);
	}
}

function deleteplayer() {
	$.ajax({
		method: 'DELETE',
		url: 'http://localhost:8080/players/' + id
	})
}

function borrarsocket()
{
	var msg = {
			name : "delete",
			message : "delete session"
		}
	connection.send(JSON.stringify(msg));
}

window.onbeforeunload = function() {
	deleteplayer();
	return null;
}

