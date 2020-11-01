import { sceneManager } from "../sceneManager.js";
export class MainMenu extends Phaser.Scene {
	constructor() {
		super({
			key: sceneManager.SCENES.MAINMENU
		})
	}

	init(data) {
		console.log(data);
		console.log("lo tengo")
	}
	preload() {
		this.load.image('fondo', 'resources/images/fondo.jpg');
	}
	create() {
		this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo');
	}
	update() {
		this.fondo.tilePositionY += 1;
	}
}