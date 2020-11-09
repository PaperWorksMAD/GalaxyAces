import { sceneManager } from "../sceneManager.js";
export class Game extends Phaser.Scene {
    constructor() {
        super({
            key: sceneManager.SCENES.GAME
        })
    }
    onEvent() {
        this.initialTime -= 1; // One second
        this.text.setText(this.formatTime(this.initialTime));
    }
    onEvent2() {
        console.log("final");
    }

    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    init() {
    }
    create() {
        this.initialTime = 20;

        let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(2);
        xbt.setInteractive();
        xbt.on("pointerup", () => {
            this.scene.start(sceneManager.SCENES.MAINMENU);
        })

        this.text = this.add.bitmapText(this.game.renderer.width/2-32, 32,"bit", this.formatTime(this.initialTime),24).setDepth(2);
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);
        this.jugador1 = this.physics.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height - 100, "nave2");
        this.jugador1.setScale(0.5);
        this.jugador1.setCollideWorldBounds(true);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('A,W,S,D');
        this.jugador2 = this.physics.add.image(this.game.renderer.width / 2 - 150, this.game.renderer.height - 100, "nave2");
        this.jugador2.setScale(0.5);
        this.jugador2.setCollideWorldBounds(true);

        this.tiempo = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        this.tiempopartida = this.time.delayedCall(this.initialTime*1000, this.onEvent2, [], this);
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