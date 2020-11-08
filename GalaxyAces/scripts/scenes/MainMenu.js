import { sceneManager } from "../sceneManager.js";

var bgmusic = false;

export class MainMenu extends Phaser.Scene {
	constructor() {
		super({
			key: sceneManager.SCENES.MAINMENU
		})
	}

	init() {
	}
	
	create() {
		console.log(bgmusic);
		this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondomenu').setDepth(0);
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "titulo").setDepth(1);
		let playbt = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "playbt").setDepth(2);
		let configbt = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "configbt").setDepth(2);
		let hover = this.add.image(100, 100, "nave1");
		hover.setScale(0.75);
		hover.setVisible(false);
		configbt.setScale(0.5);

		if (bgmusic === false) {
			this.musicamenu = this.sound.add("bitmenu", {
				volume: 0.5
			})
			this.musicamenu.play({
				loop: true
			});
			bgmusic = true;
			console.log(bgmusic);
		}

		playbt.setInteractive();
		configbt.setInteractive();

		playbt.on("pointerover", () => {
			hover.setVisible(true);
			hover.x = playbt.x - 180;
			hover.y = playbt.y;
		})

		playbt.on("pointerout", () => {
			hover.setVisible(false);
		})

		playbt.on("pointerup", () => {
			//this.sound.get("bitmenu").stop();
			this.scene.start(sceneManager.SCENES.GAME);
		})

		configbt.on("pointerover", () => {
			hover.setVisible(true);
			hover.x = configbt.x - 190;
			hover.y = configbt.y;
		})

		configbt.on("pointerout", () => {
			hover.setVisible(false);
		})

		configbt.on("pointerup", () => {
			//this.sound.get("bitmenu").stop();
			this.scene.start(sceneManager.SCENES.CONFIG, this.musicamenu);
		})

	}
	update() {
		this.fondo.tilePositionX += 0.5;
	}
}