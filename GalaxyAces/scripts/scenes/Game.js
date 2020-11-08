import { sceneManager } from "../sceneManager.js";
export class Game extends Phaser.Scene {
    constructor() {
        super({
            key: sceneManager.SCENES.GAME
        })
    }
    init() {
    }
    create() {
        let xbt= this.add.image(this.game.renderer.width-50, this.game.renderer.height-550, "x").setDepth(2);
        xbt.setInteractive();
		xbt.on("pointerup",()=>{
			this.scene.start(sceneManager.SCENES.MAINMENU);
        })
        
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);
        this.jugador1 = this.physics.add.image(this.game.renderer.width / 2 - 150, this.game.renderer.height - 100, "nave2");
        this.jugador1.setScale(0.5);
        this.jugador1.setCollideWorldBounds(true);
        this.cursor = this.input.keyboard.createCursorKeys();   
        this.keys = this.input.keyboard.addKeys('A,W,S,D');
        this.jugador2 = this.physics.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height - 100, "nave2");
        this.jugador2.setScale(0.5);
        this.jugador2.setCollideWorldBounds(true);
    }
    update() {

        this.jugador1.setVelocity(0);
        this.jugador2.setVelocity(0);

        if (this.cursor.left.isDown) {
            this.jugador1.setVelocityX(-200);
        }
        else if (this.cursor.right.isDown) {
            this.jugador1.setVelocityX(200);
        }

        if (this.cursor.up.isDown) {
            this.jugador1.setVelocityY(-200);
        }
        else if (this.cursor.down.isDown) {
            this.jugador1.setVelocityY(200);
        }

        if (this.keys.A.isDown) {
            this.jugador2.setVelocityX(-200);
        }
        else if (this.keys.D.isDown) {
            this.jugador2.setVelocityX(200);
        }

        if (this.keys.W.isDown) {
            this.jugador2.setVelocityY(-200);
        }
        else if (this.keys.S.isDown) {
            this.jugador2.setVelocityY(200);
        }
        
        this.fondo.tilePositionY -= 1;
    }
}