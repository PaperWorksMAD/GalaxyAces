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
	create() {
		this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondomenu');
	}
	update() {
		this.fondo.tilePositionX += 0.5;
	}
}