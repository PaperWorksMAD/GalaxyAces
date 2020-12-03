import { sceneManager } from "../sceneManager.js";


export class CharacterSelect extends Phaser.Scene {
    constructor() {
        super({
            key: sceneManager.SCENES.CHARACTERSELECT
        })
    }

    init() {
    }

    create() {
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondomenu').setDepth(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "titulo").setDepth(1);

        this.jugador = 1
        this.shipIndex1 = 0;
        this.shipIndex2 = 0;

        let nave2 = this.add.image(this.game.renderer.width / 2, 350, 'nave2').setDepth(1).setInteractive();
        let nave3 = this.add.image(this.game.renderer.width / 2 - 150, 350, 'nave3').setDepth(1).setInteractive();
        let nave4 = this.add.image(this.game.renderer.width / 2 + 150, 350, 'nave4').setDepth(1).setInteractive();

        let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(2);
        xbt.setInteractive();
        xbt.on("pointerup", () => {
            this.scene.start(sceneManager.SCENES.MAINMENU);
        })

        this.input.keyboard.on('keydown-SPACE', this.handleContinue, this);

        nave2.on("pointerover", () => {
            if (this.jugador === 1) {
                nave2.setTint(0xefb810);
            } else if (this.jugador === 2 && this.shipIndex1 != 2) {
                nave2.setTint(0x3b83bd);
            }
        })

        nave2.on("pointerout", () => {
            if (this.shipIndex1 != 2 && this.shipIndex2 != 2)
                nave2.clearTint();
        })

        nave2.on("pointerup", () => {
            if (this.jugador === 1) {
                this.shipIndex1 = 2;
                this.jugador++;
            } else if (this.jugador === 2 && this.shipIndex1 != 2) {
                this.shipIndex2 = 2;
                this.jugador++;
            }
        })


        nave3.on("pointerover", () => {
            if (this.jugador === 1) {
                nave3.setTint(0xefb810);
            } else if (this.jugador === 2 && this.shipIndex1 != 3) {
                nave3.setTint(0x3b83bd);
            }
        })

        nave3.on("pointerout", () => {
            if (this.shipIndex1 != 3 && this.shipIndex2 != 3)
                nave3.clearTint();
        })

        nave3.on("pointerup", () => {
            if (this.jugador === 1) {
                this.shipIndex1 = 3;
                this.jugador++;
            } else if (this.jugador === 2 && this.shipIndex1 != 3) {
                this.shipIndex2 = 3;
                this.jugador++;
            }
        })



        nave4.on("pointerover", () => {
            if (this.jugador === 1) {
                nave4.setTint(0xefb810);
            } else if (this.jugador === 2 && this.shipIndex1 != 4) {
                nave4.setTint(0x3b83bd);
            }
        })

        nave4.on("pointerout", () => {
            if (this.shipIndex1 != 4 && this.shipIndex2 != 4)
                nave4.clearTint();
        })

        nave4.on("pointerup", () => {
            if (this.jugador === 1) {
                this.shipIndex1 = 4;
                this.jugador++;
            } else if (this.jugador === 2 && this.shipIndex1 != 4) {
                this.shipIndex2 = 4;
                this.jugador++;
            }
        })

    }

    update() {
        this.fondo.tilePositionX += 0.5;
        if (this.jugador >= 3) {
            this.add.image(this.game.renderer.width/2 , this.game.renderer.height * 0.90, "presionaespacio").setDepth(2).setScale(0.5);
        }
    }

    handleContinue() {
        if (this.jugador >= 3) {
            this.scene.start(sceneManager.SCENES.GAME, { shipIndex1: this.shipIndex1, shipIndex2: this.shipIndex2 });
        }
    }
}