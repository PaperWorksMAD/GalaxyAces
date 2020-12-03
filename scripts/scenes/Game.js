import { sceneManager } from "../sceneManager.js";

var bullets;
var bullets2;
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
        this.scene.start(sceneManager.SCENES.SCORE,{score: this.jugador1.puntuacion, score2: this.jugador2.puntuacion});
    }

    formatTime(seconds) {
        // Minutes
        var minutes = Math.floor(seconds / 60);
        // Seconds
        var partInSeconds = seconds % 60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    init(data) {
        this.shipIndex1 = data.shipIndex1;
        this.shipIndex2 = data.shipIndex2;
    }

    create() {

        //Animaciones
        this.anims.create({ key: 'Exhaust6', frames: this.anims.generateFrameNumbers('exhaust6'), frameRate: 6, yoyo: false, repeat: -1 });
        this.anims.create({ key: 'EnemyAnim', frames: this.anims.generateFrameNumbers('enemy'), frameRate: 2, yoyo: false, repeat: -1 });

        this.anims.create({ key: 'AnimationBullet', frames: this.anims.generateFrameNumbers('bala6'), frameRate: 12, yoyo: true, repeat: -1 });
        this.anims.create({ key: 'AnimationExplosion', frames: this.anims.generateFrameNumbers('explosion'), frameRate: 22, yoyo: false, repeat: 0 , hideOnComplete: true });

        //clase bala
        var Bullet = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Sprite,

            initialize:

                function Bullet(scene) {
                    Phaser.Physics.Arcade.Sprite.call(this, scene, 0, 0, 'bala6');

                    //this.speed = Phaser.Math.GetSpeed(400, 1);
                    this.setRotation(80);
                    this.jugador;
                    

                    this.anims.play('AnimationBullet');
                },

            fire: function (x, y, i) {
                this.setPosition(x, y - 50);
                this.setVelocity(0,-400);
                this.setSize(30,30,true);

                this.setActive(true);
                this.setVisible(true);

                this.jugador = i;
            },

            update: function (time, delta) {
                //this.y -= this.speed * delta;

                if (this.y < -50 || this.x < -50) {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }

        });

        bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 5,
            runChildUpdate: true
        });

        bullets2 = this.physics.add.group({
            classType: Bullet,
            maxSize: 5,
            runChildUpdate: true
        });


        class Entity extends Phaser.Physics.Arcade.Sprite {
            constructor(scene, x, y, key, type){
                super(scene,x,y,key);
                this.scene = scene;
                this.scene.add.existing(this);
                this.scene.physics.world.enableBody(this, 0);
                this.setData("type", type);
                this.setData("isDead", false);
            }
        }

        class Jugador extends Entity {

            constructor(scene, x, y, key, type){
                super(scene, x, y, key, "Jugador");

                this.setScale(0.5).setDepth(3).setCollideWorldBounds(true).setBounce(0.1,0.1);

                //this.exhaust = Phaser.add.sprite(x, y + 40, 'exhaust6').setDepth(2).setRotation(-80).setScale(1.2).setVisible(false);
                console.log(this);
                //this.exhaust.anims.play('Exhaust6');
                this.puntuacion = 0;
            }

            moveUp(){
                this.setVelocity(0,-100);
                //this.exhaust.setY(this.sprite.y + 40);
                //this.exhaust.setVisible(true);
            }

            moveDown(){
                this.setVelocity(0, 100);
                //this.exhaust.setY(this.sprite.y + 40);
                //this.exhaust.setVisible(true);
            }

            moveLeft(){
                this.setVelocity(-100,0);
                //this.exhaust.setY(this.sprite.y + 40);
                //this.exhaust.setVisible(true);
            }

            moveRight(){
                this.setVelocity(100,0);
                //this.exhaust.setY(this.sprite.y + 40);
                //this.exhaust.setVisible(true);
            }
        }

        class Enemigo extends Entity {
            constructor(scene, x, y, key, type){
                super(scene, x, y, key, "Enemigo");

                this.setScale(2).setDepth(2).setCollideWorldBounds(false).setBounce(1,1);
                this.anims.play('EnemyAnim');

                this.vida = 2;

            }

            recibirDaño(i){
                this.vida -= 1;

                if (this.vida <= 0){
                    this.setActive(false);
                    this.setVisible(false);
                    this.setPosition(-100,-100);
                    console.log("muerto");
                }
            }

            mover(x,y){
                this.setVelocity(x,y);
            }
        }


        speed = Phaser.Math.GetSpeed(300, 1);

        //Tiempo de partida en segundos
        this.initialTime = 10;

        let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(2);
        xbt.setInteractive();
        xbt.on("pointerup", () => {
            this.scene.start(sceneManager.SCENES.MAINMENU);
        })

        this.text = this.add.bitmapText(this.game.renderer.width / 2 - 32, 32, "bit", this.formatTime(this.initialTime), 24).setDepth(2);
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);
        this.fondo2 = this.add.tileSprite(600, 300, 800, 600, 'fondo2').setDepth(0);
        this.fondo3 = this.add.tileSprite(200, 300, 800, 600, 'fondo3').setDepth(0);
        console.log(this);

        //Jugadores
        this.jugador1 = new Jugador(this, this.game.renderer.width / 2 + 150, this.game.renderer.height - 100, "nave"+this.shipIndex1);
        this.jugador2 = new Jugador(this, this.game.renderer.width / 2 - 150, this.game.renderer.height - 100, "nave"+this.shipIndex2);
        
        this.cursor = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('A,W,S,D');
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


        this.exhaust1 = this.add.sprite(this.jugador1.x, this.jugador1.y + 40, 'exhaust6').setDepth(2).setRotation(-80).setScale(1.2);
        this.exhaust1.setVisible(false);
        this.anim1 = this.anims.create({ key: 'Animation', frames: this.anims.generateFrameNumbers('exhaust6'), frameRate: 6, yoyo: false, repeat: -1 });
        this.exhaust1.anims.play('Animation');

        this.exhaust2 = this.add.sprite(this.jugador2.x, this.jugador2.y + 40, 'exhaust6').setDepth(2).setRotation(-80).setScale(1.2);
        this.exhaust2.setVisible(false);
        this.anim2 = this.anims.create({ key: 'Animation2', frames: this.anims.generateFrameNumbers('exhaust6'), frameRate: 6, yoyo: false, repeat: -1 });
        this.exhaust2.anims.play('Animation2');

        //Enemigo
        this.enemy = new Enemigo(this, 50, 50, 'enemy');

        //Deteccion de colisiones
        //Entre jugadores
        this.physics.add.collider(this.jugador1, this.jugador2);
        //Entre enemigo y jugadores
        this.physics.add.collider(this.enemy, [this.jugador1, this.jugador2]);
        //Entre balas y enemigos
        this.physics.add.collider(this.enemy, [bullets, bullets2], this.collissionHandlerEnemy, null, this);
        //Entre balas y jugadores
        this.physics.add.collider(this.jugador1, [bullets, bullets2], this.collissionHandler, null, this);
        this.physics.add.collider(this.jugador2, [bullets, bullets2], this.collissionHandler, null, this);

        this.explod;

        //Timer de partida y cuenta atras
        this.tiempo = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        this.tiempopartida = this.time.delayedCall(this.initialTime * 1000, this.onEvent2, [], this);
    }
    update(time, delta) {

        this.jugador1.setVelocity(0);
        this.jugador2.setVelocity(0);
        this.exhaust1.setVisible(false);
        this.exhaust2.setVisible(false);



        if (this.cursor.left.isDown) {
            this.jugador1.moveLeft();
            this.exhaust1.setX(this.jugador1.x).setVisible(true);
        }
        else if (this.cursor.right.isDown) {
            this.jugador1.moveRight();
            this.exhaust1.setX(this.jugador1.x).setVisible(true);
        }

        if (this.cursor.up.isDown) {
            this.jugador1.moveUp();
            this.exhaust1.setY(this.jugador1.y + 40).setVisible(true);
        }
        else if (this.cursor.down.isDown) {
            this.jugador1.moveDown();
            this.exhaust1.setY(this.jugador1.y + 40).setVisible(true);
        }

        if (this.keys.A.isDown) {
            this.jugador2.moveLeft();
            this.exhaust2.setX(this.jugador2.x).setVisible(true);
        }
        else if (this.keys.D.isDown) {
            this.jugador2.moveRight();
            this.exhaust2.setX(this.jugador2.x).setVisible(true);
        }

        if (this.keys.W.isDown) {
            this.jugador2.moveUp();
            this.exhaust2.setY(this.jugador2.y + 40).setVisible(true);
        }
        else if (this.keys.S.isDown) {
            this.jugador2.moveDown();
            this.exhaust2.setY(this.jugador2.y + 40).setVisible(true);
        }
        this.fondo.tilePositionY -= 1;
        this.fondo2.tilePositionY -= 0.5;
        this.fondo3.tilePositionY -= 0.2;

        if (this.spaceBar.isDown && time > lastFired) {
            console.log("disparo");
            var bullet = bullets.get();

            if (bullet) {
                bullet.fire(this.jugador2.x, this.jugador2.y, 2);

                lastFired = time + 100;
            }
        }

        if (this.P.isDown && time > lastFired) {
            console.log("disparo");
            var bullet = bullets2.get();

            if (bullet) {
                bullet.fire(this.jugador1.x, this.jugador1.y, 1);

                lastFired = time + 100;
            }
        }

    }

    collissionHandler(obj1, obj2){
        console.log("colision");
        obj1.setVelocity(0);
        obj2.setActive(false).setVisible(false).setPosition(-50,-50);

        //Animacion de daño
        this.explod = this.explosions.get();

        if (this.explod)
            this.explod.aparecer(obj1.x, obj1.y);
    }

    collissionHandlerEnemy(obj1, obj2){
        console.log("colision con enemigo");
        obj1.setVelocity(0);
        obj2.play('AnimationExplosion');
        obj2.setScale(0.8).setVelocity(0);

        this.time.addEvent({
            delay: 400,
            callback: function(){
                obj2.setActive(false).setVisible(false).setPosition(-50,-50);
            }
        });


        //Recibir daño
        obj1.recibirDaño(obj2.jugador);

        if (obj1.vida <= 0){
            if (obj2.jugador == 1){
                this.jugador1.puntuacion += 10;
                console.log(this.jugador1.puntuacion);
            }else{
                this.jugador2.puntuacion += 10;
                console.log(this.jugador2.puntuacion);
            }
        }
    }


}