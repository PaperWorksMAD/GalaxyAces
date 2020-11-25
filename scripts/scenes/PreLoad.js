import { sceneManager } from "../sceneManager.js";
export class PreLoad extends Phaser.Scene {
	constructor() {
		super({
			key: sceneManager.SCENES.PRELOAD
		})
	}
	init() {

	}
	preload() {
		this.load.image("fondomenu", "./resources/images/fondomenu.png");
		this.load.image("playbt", "./resources/images/play.png");
		this.load.image("configbt", "./resources/images/configbt.png");
		this.load.image("x", "./resources/images/x.png");
		this.load.image("+", "./resources/images/+.png");
		this.load.image("-", "./resources/images/-.png");
		this.load.image('fondo', 'resources/images/fondo.jpg');
		this.load.image('fondo2', 'resources/images/fondo2.png');
		this.load.image('fondo3', 'resources/images/fondo3.png');
		this.load.image('titulo', 'resources/images/titulo.png');
		this.load.image('nave1', 'resources/images/Ship2.png');
		this.load.image('nave2', 'resources/images/Ship6.png');
		this.load.image('nave3', 'resources/images/Ship3.png');
		this.load.image('nave4', 'resources/images/Ship1.png');
		this.load.image('configuracion', 'resources/images/config.png');
		this.load.image('volumen', 'resources/images/volumen.png');
		this.load.spritesheet('bala6', 'resources/images/spritesheetShot6.png', {
			frameWidth: 130,
			frameHeight: 130
		});
		this.load.spritesheet('exhaust6', 'resources/images/spritesheetExhaust6.png', {
			frameWidth: 34,
			frameHeight: 34
		});

		//Enemigos
		this.load.spritesheet('enemy', 'resources/images/enemy.png', {
			frameWidth: 20,
			frameHeight: 17
		});
		//Explosion
		this.load.spritesheet('explosion', 'resources/images/explosion.png', {
			frameWidth: 258,
			frameHeight: 258
		});

		this.load.image("rrssbt", "./resources/images/rrss.png");

		//Redes sociales
		this.load.image('instagramText', 'resources/images/instagramText.png');
		this.load.image('twitterText', 'resources/images/twitterText.png');
		this.load.image('instagram', 'resources/images/instagram.png');
		this.load.image('twitter', 'resources/images/twitter.png');

		this.load.bitmapFont('bit', 'resources/fonts/bitmap.png', 'resources/fonts/bitmap.xml');


		this.load.audio('bitmenu', 'resources/sounds/BitRush.mp3');


		var loadingBar = this.add.graphics({
			fillStyle: {
				color: 0xffffff
			}
		})

		for (var i = 0; i < 100; i++) {
			this.load.image("fondomenu", "./resources/images/fondomenu.png");
		}

		this.load.on("progress", (percent) => {
			loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
			console.log(percent);
		})
	}
	create() {
		this.scene.start(sceneManager.SCENES.MAINMENU, "hola");
	}
}
