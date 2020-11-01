import { sceneManager } from "../sceneManager.js";
export class PreLoad extends Phaser.Scene{
	constructor(){
		super({
			key: sceneManager.SCENES.PRELOAD
		})
	}
	init(){

	}
	preload(){

	}
	create(){
		this.scene.start(sceneManager.SCENES.MAINMENU, "hola");
	}
}