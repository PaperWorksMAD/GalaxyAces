import { sceneManager } from "../sceneManager.js";
export class Score extends Phaser.Scene {
    constructor() {
        super({
            key: sceneManager.SCENES.SCORE
        })
    }
    init() {
    }
    create() {
        this.puntuaciones = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "puntuaciones").setDepth(2);
        this.puntuaciones.setScale(0.75);
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);
        this.fondo2 = this.add.tileSprite(600, 300, 800, 600, 'fondo2').setDepth(0);
        this.fondo3 = this.add.tileSprite(200, 300, 800, 600, 'fondo3').setDepth(0);

        let xbt= this.add.image(this.game.renderer.width-50, this.game.renderer.height-550, "x").setDepth(2);
        xbt.setInteractive();
		xbt.on("pointerup",()=>{
			this.scene.start(sceneManager.SCENES.MAINMENU);
        })
    }
    update() {
        this.fondo.tilePositionX += 0.5;
        this.fondo.tilePositionY += 0.2;
        this.fondo2.tilePositionX += 0.2;
        this.fondo2.tilePositionY += 0.5;
        this.fondo3.tilePositionX += 0.3;
        this.fondo3.tilePositionY += 0.3;

    }
}