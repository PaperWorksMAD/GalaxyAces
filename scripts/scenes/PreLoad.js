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
		this.load.image('titulo', 'resources/images/titulo.png');
		this.load.image('nave1', 'resources/images/Ship2.png');
		this.load.image('nave2', 'resources/images/Ship6.png');
		this.load.image('configuracion', 'resources/images/config.png');
		this.load.image('volumen', 'resources/images/volumen.png');
		this.load.spritesheet('bala', 'resources/images/spritesheetExhaust6.png', {
			frameWidth: 17,
			frameHeight: 17
		});
		this.load.spritesheet('exhaust6', 'resources/images/spritesheetExhaust6.png', {
			frameWidth: 34,
			frameHeight: 34
		});

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
