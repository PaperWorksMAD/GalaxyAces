import { sceneManager } from "../sceneManager.js";
export class Score extends Phaser.Scene {
    constructor() {
        super({
            key: sceneManager.SCENES.SCORE
        })
    }
    init(data) {
        console.log("init", data);
        this.puntuacion1 = data.score;
        this.puntuacion2 = data.score2;
        this.eliminados1 = data.enemigos1;
        this.eliminados2 = data.enemigos2;
        this.muertos = data.muerto;
    }
    create() {
        this.puntuaciones = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "puntuaciones").setDepth(2);
        this.puntuaciones.setScale(0.75);
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);
        this.fondo2 = this.add.tileSprite(600, 300, 800, 600, 'fondo2').setDepth(0);
        this.fondo3 = this.add.tileSprite(200, 300, 800, 600, 'fondo3').setDepth(0);

        if (this.muertos == 1) {
            this.add.bitmapText(this.game.renderer.width / 2 - 200, 220, "bit", "Jugador 2 Gana!", 36).setDepth(2);
        } else if (this.muertos == 2) {
            this.add.bitmapText(this.game.renderer.width / 2 - 200, 220, "bit", "Jugador 1 Gana!", 36).setDepth(2);
        } else {
            if (this.puntuacion1 > this.puntuacion2) {
                this.add.bitmapText(this.game.renderer.width / 2 - 200, 220, "bit", "Jugador 1 Gana!", 36).setDepth(2);
            } else if (this.puntuacion1 < this.puntuacion2) {
                this.add.bitmapText(this.game.renderer.width / 2 - 200, 220, "bit", "Jugador 2 Gana!", 36).setDepth(2);
            } else {
                this.add.bitmapText(this.game.renderer.width / 2 - 200, 220, "bit", "Empate", 36).setDepth(2);
            }
        }

        this.add.bitmapText(this.game.renderer.width / 2 + 80, 300, "bit", "eliminados", 18).setDepth(2);
        this.add.bitmapText(this.game.renderer.width / 2 - 60, 300, "bit", "puntos", 18).setDepth(2);

        this.add.bitmapText(this.game.renderer.width / 2 - 200, 350, "bit", "Jugador 1: " + this.puntuacion1, 24).setDepth(2);
        this.add.bitmapText(this.game.renderer.width / 2 + 50, 350, "bit", "           " + this.eliminados1, 24).setDepth(2);

        this.add.bitmapText(this.game.renderer.width / 2 - 200, 390, "bit", "Jugaddr 2: " + this.puntuacion2, 24).setDepth(2);
        this.add.bitmapText(this.game.renderer.width / 2 + 50, 390, "bit", "           " + this.eliminados2, 24).setDepth(2);

        let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(2);
        xbt.setInteractive();
        xbt.on("pointerup", () => {
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