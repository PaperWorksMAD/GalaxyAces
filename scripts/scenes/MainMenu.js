import { sceneManager } from "../sceneManager.js";

var bgmusic = false;

var efSound = true;

var efvol = 0.5;

export class MainMenu extends Phaser.Scene {
	constructor() {
		super({
			key: sceneManager.SCENES.MAINMENU
		})
	}

	init(data) {
		efSound = data.efSound;
		this.efvol = data.efvol;
	}
	
	create() {
		console.log(bgmusic);
		efvol = this.efvol;
		console.log("vol ef",efvol);
		this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondomenu').setDepth(0);
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "titulo").setDepth(1);
		let playbt = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 10, "playbt").setDepth(2);
		let configbt = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "configbt").setDepth(2);
		let hover = this.add.image(100, 100, "nave1");
		hover.setScale(0.75);
		hover.setVisible(false);
		configbt.setScale(0.5);

		//this.efecsound;

		//Boton redes sociales y controles
		let rrssbt = this.add.image(this.game.renderer.width / 2 - 150, this.game.renderer.height * 0.85, "contacto").setDepth(2).setScale(0.4);
		let controlsbt = this.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height * 0.85, "controles").setDepth(2).setScale(0.4);

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

		rrssbt.setInteractive();
		controlsbt.setInteractive();

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
			this.scene.start(sceneManager.SCENES.CHARACTERSELECT, {efSound: efSound, efvol: efvol});
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
			this.scene.start(sceneManager.SCENES.CONFIG, {music: this.musicamenu, efSound: efSound, efvol: efvol});
		})

		rrssbt.on("pointerover", () => {
			hover.setVisible(true);
			hover.x = rrssbt.x - 140;
			hover.y = rrssbt.y;
		})

		rrssbt.on("pointerout", () => {
			hover.setVisible(false);
		})

		rrssbt.on("pointerup", () => {
			//this.sound.get("bitmenu").stop();
			this.scene.start(sceneManager.SCENES.RRSS);
		})

		controlsbt.on("pointerover", () => {
			hover.setVisible(true);
			hover.x = controlsbt.x - 140;
			hover.y = controlsbt.y;
		})

		controlsbt.on("pointerout", () => {
			hover.setVisible(false);
		})

		controlsbt.on("pointerup", () => {
			//this.sound.get("bitmenu").stop();
			this.scene.start(sceneManager.SCENES.CONTROLS);
		})

	}
	update() {
		this.fondo.tilePositionX += 0.5;
	}
}