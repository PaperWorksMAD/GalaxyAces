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
		this.load.image("fondomenu","./resources/images/fondomenu.png");
		this.load.image("playbt","./resources/images/play.png");
		this.load.image('fondo', 'resources/images/fondo.jpg');
		this.load.image('titulo', 'resources/images/titulo.jpg');

		var loadingBar = this.add.graphics({
			fillStyle:{
				color: 0xffffff
			}
		}) 

		for (var i= 0; i<200; i ++){
			this.load.image("fondomenu","./resources/images/fondomenu.png");		
		}

		this.load.on("progress", (percent)=>{
			loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width* percent, 50);
			console.log(percent);
		})
	}
	create(){
		this.scene.start(sceneManager.SCENES.MAINMENU, "hola");
	}
}
