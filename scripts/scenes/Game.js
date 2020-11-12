import { sceneManager } from "../sceneManager.js";

var bullets;
var speed;
var lastFired = 0;

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

        this.animBullet = this.anims.create({key:'AnimationBullet', frames: this.anims.generateFrameNumbers('bala6'),frameRate: 12, yoyo: true, repeat: -1});

        //clase bala
        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Sprite,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bala6');
    
                this.speed = Phaser.Math.GetSpeed(400, 1);
                this.setRotation(80);
                
                this.anims.play('AnimationBullet');
            },
    
            fire: function (x, y)
            {
                this.setPosition(x, y - 50);
    
                this.setActive(true);
                this.setVisible(true);
            },
    
            update: function (time, delta)
            {
                this.y -= this.speed * delta;
    
                if (this.y < -50)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
    
        });

        bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });

        speed = Phaser.Math.GetSpeed(300, 1);

        this.initialTime = 20;

        let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(2);
        xbt.setInteractive();
        xbt.on("pointerup", () => {
            this.scene.start(sceneManager.SCENES.MAINMENU);
        })

        this.text = this.add.bitmapText(this.game.renderer.width/2-32, 32,"bit", this.formatTime(this.initialTime),24).setDepth(2);
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);
        this.fondo2 = this.add.tileSprite(600, 300, 800, 600, 'fondo2').setDepth(0);
        this.fondo3 = this.add.tileSprite(200, 300, 800, 600, 'fondo3').setDepth(0);
        this.jugador1 = this.physics.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height - 100, "nave2");
        this.jugador1.setScale(0.5).setDepth(3);
        this.jugador1.setCollideWorldBounds(true);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('A,W,S,D');
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.jugador2 = this.physics.add.image(this.game.renderer.width / 2 - 150, this.game.renderer.height - 100, "nave2");
        this.jugador2.setScale(0.5).setDepth(3);
        this.jugador2.setCollideWorldBounds(true);

        this.exhaust1 = this.add.sprite(this.jugador1.x, this.jugador1.y+40,'exhaust6').setDepth(2).setRotation(-80).setScale(1.2);
        this.exhaust1.setVisible(false);
        this.anim1 = this.anims.create({key:'Animation', frames: this.anims.generateFrameNumbers('exhaust6'),frameRate: 6, yoyo: false,repeat: -1});
        this.exhaust1.anims.play('Animation');

        this.exhaust2 = this.add.sprite(this.jugador2.x, this.jugador2.y+40,'exhaust6').setDepth(2).setRotation(-80).setScale(1.2);
        this.exhaust2.setVisible(false);
        this.anim2 = this.anims.create({key:'Animation2', frames: this.anims.generateFrameNumbers('exhaust6'),frameRate: 6, yoyo: false,repeat: -1});
        this.exhaust2.anims.play('Animation2');


        this.tiempo = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        this.tiempopartida = this.time.delayedCall(this.initialTime*1000, this.onEvent2, [], this);
    }
    update(time, delta) {

        this.jugador1.setVelocity(0);
        this.jugador2.setVelocity(0);
        this.exhaust1.setVisible(false);
        this.exhaust2.setVisible(false);

        if (this.cursor.left.isDown) {
            this.jugador1.setX(this.jugador1.x - 2);
            this.exhaust1.setX(this.jugador1.x);
            this.exhaust1.setVisible(true);
        }
        else if (this.cursor.right.isDown) {
            this.jugador1.setX(this.jugador1.x + 2);
            this.exhaust1.setX(this.jugador1.x);
            this.exhaust1.setVisible(true);
        }

        if (this.cursor.up.isDown) {
            this.jugador1.setY(this.jugador1.y - 2);
            this.exhaust1.setY(this.jugador1.y+40);
            this.exhaust1.setVisible(true);
        }
        else if (this.cursor.down.isDown) {
            this.jugador1.setY(this.jugador1.y + 2);
            this.exhaust1.setY(this.jugador1.y+40);
            this.exhaust1.setVisible(true);
        }

        if (this.keys.A.isDown) {
            this.jugador2.setX(this.jugador2.x - 2);
            this.exhaust2.setX(this.jugador2.x);
            this.exhaust2.setVisible(true);
        }
        else if (this.keys.D.isDown) {
            this.jugador2.setX(this.jugador2.x + 2);
            this.exhaust2.setX(this.jugador2.x);
            this.exhaust2.setVisible(true);
        }

        if (this.keys.W.isDown) {
            this.jugador2.setY(this.jugador2.y - 2);
            this.exhaust2.setY(this.jugador2.y+40);
            this.exhaust2.setVisible(true);
        }
        else if (this.keys.S.isDown) {
            this.jugador2.setY(this.jugador2.y + 2);
            this.exhaust2.setY(this.jugador2.y+40);
            this.exhaust2.setVisible(true);
        }
        this.fondo.tilePositionY -= 1;
        this.fondo2.tilePositionY -= 0.5;
        this.fondo3.tilePositionY -= 0.2;

        if (this.spaceBar.isDown && time > lastFired){
            console.log("disparo");
            var bullet = bullets.get();

            if (bullet)
            {
                bullet.fire(this.jugador2.x, this.jugador2.y);
    
                lastFired = time + 50;
            }
        }

    }


}