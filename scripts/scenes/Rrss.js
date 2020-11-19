import { sceneManager } from "../sceneManager.js";
export class Rrss extends Phaser.Scene {
    constructor() {
        super({
            key: sceneManager.SCENES.RRSS
        })
    }
    init() {
    }
    create() {
        
        
        this.fondorrss = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);    

        let xbt= this.add.image(this.game.renderer.width-50, this.game.renderer.height-550, "x").setDepth(2);
        xbt.setInteractive();
		xbt.on("pointerup",()=>{
			this.scene.start(sceneManager.SCENES.MAINMENU);
        })
    }
    update() {
        this.fondorrss.tilePositionX -= 1;
        this.fondorrss.tilePositionY -= 1;
    }
}