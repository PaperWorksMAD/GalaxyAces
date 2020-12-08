import { sceneManager } from "../sceneManager.js";

var bullets;
var bullets2;
var explosions;
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
        this.scene.start(sceneManager.SCENES.SCORE, { score: this.jugador1.puntuacion, score2: this.jugador2.puntuacion, enemigos1: this.jugador1.bajas, enemigos2: this.jugador2.bajas });
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
        this.anims.create({ key: 'Exhaust2', frames: this.anims.generateFrameNumbers('exhaust2'), frameRate: 6, yoyo: false, repeat: -1 });
        this.anims.create({ key: 'Exhaust3', frames: this.anims.generateFrameNumbers('exhaust3'), frameRate: 6, yoyo: false, repeat: -1 });
        this.anims.create({ key: 'Exhaust4', frames: this.anims.generateFrameNumbers('exhaust4'), frameRate: 6, yoyo: false, repeat: -1 });
        this.anims.create({ key: 'EnemyAnim', frames: this.anims.generateFrameNumbers('enemy'), frameRate: 2, yoyo: false, repeat: -1 });
        this.anims.create({ key: 'EnemyAnim3', frames: this.anims.generateFrameNumbers('enemy3'), frameRate: 2, yoyo: false, repeat: -1 });

        this.anims.create({ key: 'AnimationBullet', frames: this.anims.generateFrameNumbers('bala6'), frameRate: 12, yoyo: true, repeat: -1 });
        this.anims.create({ key: 'AnimationExplosion', frames: this.anims.generateFrameNumbers('explosion'), frameRate: 22, yoyo: false, repeat: 0, hideOnComplete: true });

        //Clase general
        class Entity extends Phaser.Physics.Arcade.Sprite {
            constructor(scene, x, y, key, type) {
                super(scene, x, y, key);
                this.scene = scene;
                this.scene.add.existing(this);
                this.scene.physics.world.enableBody(this, 0);
                this.setData("type", type);
                this.setData("isDead", false);
            }
        }


        class Bala extends Entity {

            constructor(scene, x, y, key, type) {
                super(scene, x, y, key, "Bala");
                this.setRotation(80);
                this.anims.play('AnimationBullet');
                this.jugador;

            }

            fire(x,y,i){
                this.setSize(30, 30, true);
                this.setPosition(x, y - 50);
                this.setVelocity(0, -400);
                
                this.setActive(true);
                this.setVisible(true);

                this.jugador = i;
            }

            update(time, delta){
                if (this.y < -500 || this.x < -500) {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }


        }

        bullets = this.physics.add.group({
            classType: Bala,
            maxSize: 5,
            runChildUpdate: true,
        });

        bullets2 = this.physics.add.group({
            classType: Bala,
            maxSize: 5,
            runChildUpdate: true,
        });

        class Explosion extends Phaser.GameObjects.Sprite {
            constructor(scene, x, y, key, type) {
                super(scene, x, y, key, "Explosion");
            }
            aparecer(x,y){
                this.setPosition(x,y).setVisible(true).setActive(true);
                this.anims.play('AnimationExplosion');
            }
        }

        explosions = this.add.group({
            classType: Explosion,
            maxSize: 10,
            runChildUpdate: false,
            key:'explosion'
        });
        

        class Jugador extends Entity {

            constructor(scene, x, y, key, type, game) {
                super(scene, x, y, key, "Jugador");

                this.setScale(0.5).setDepth(3).setCollideWorldBounds(true).setBounce(0.1, 0.1);

                console.log(this);

                this.puntuacion = 0;
                this.bajas = 0;
                this.vidas = 3;
            }

            moveUp() {
                this.setVelocity(0, -100);
            }

            moveDown() {
                this.setVelocity(0, 100);
            }

            moveLeft() {
                this.setVelocity(-100, 0);
            }

            moveRight() {
                this.setVelocity(100, 0);
            }
        }

        class Enemigo extends Entity {
            constructor(scene, x, y, key, type) {
                super(scene, x, y, key, "Enemigo");
            }

            recibirDaño() {
                this.vida -= 1;

                if (this.vida <= 0) {
                    this.setActive(false);
                    this.setVisible(false);
                    this.setPosition(-1000, -1000);
                    console.log("muerto");
                }
            }

            mover(x, y) {
                this.setVelocity(x, y);
            }
        }

        class Enemigo1 extends Enemigo{
            constructor(scene, x, y, key, type) {
                super(scene, x, y, key, "Enemigo1");

                this.setScale(2).setDepth(1).setCollideWorldBounds(false).setBounce(1, 1).setRotation(3,14159);
                this.anims.play('EnemyAnim');

                this.vida = 2;
                this.tipo = 1;
            }
        }

        class Enemigo2 extends Enemigo{
            constructor(scene, x, y, key, type) {
                super(scene, x, y, key, "Enemigo2");

                this.setScale(0.5).setDepth(1).setCollideWorldBounds(false).setBounce(1, 1).setRotation(3,14159);

                this.vida = 4;
                this.tipo = 2;
            }

            update(time, delta){
                this.rotation += 0.05;
            }
        }

        class Enemigo3 extends Enemigo{
            constructor(scene, x, y, key, type) {
                super(scene, x, y, key, "Enemigo3");

                this.setScale(1.5).setDepth(1).setCollideWorldBounds(false).setBounce(1, 1);
                this.anims.play('EnemyAnim3');

                this.vida = 1;
                this.tipo = 3;
            }
        }


        speed = Phaser.Math.GetSpeed(300, 1);

        //Tiempo de partida en segundos
        this.initialTime = 60;
        this.muerto= 0;

        let xbt = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 550, "x").setDepth(20);
        xbt.setInteractive();
        xbt.on("pointerup", () => {
            this.scene.start(sceneManager.SCENES.MAINMENU);
        })

        this.text = this.add.bitmapText(this.game.renderer.width / 2 - 32, 32, "bit", this.formatTime(this.initialTime), 24).setDepth(10);

        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);
        this.fondo2 = this.add.tileSprite(600, 300, 800, 600, 'fondo2').setDepth(0);
        this.fondo3 = this.add.tileSprite(200, 300, 800, 600, 'fondo3').setDepth(0);
        console.log(this);

        //Jugadores
        this.jugador1 = new Jugador(this, this.game.renderer.width / 2 + 150, this.game.renderer.height - 100, "nave" + this.shipIndex1).setDepth(5);
        this.jugador2 = new Jugador(this, this.game.renderer.width / 2 - 150, this.game.renderer.height - 100, "nave" + this.shipIndex2).setDepth(5);

        this.j1puntos = this.add.bitmapText(this.game.renderer.width * 0.85, 568, "bit", "J1: " + this.jugador1.puntuacion, 24).setDepth(10);
        this.j2puntos = this.add.bitmapText(this.game.renderer.width * 0.05, 568, "bit", "J2: " + this.jugador2.puntuacion, 24).setDepth(10);

        this.cursor = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('A,W,S,D');
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


        this.j1v1 = this.add.image(this.game.renderer.width *0.82, 580, "corazon").setDepth(20);
        this.j1v2 = this.add.image(this.game.renderer.width *0.78, 580, "corazon").setDepth(20);
        this.j1v3 = this.add.image(this.game.renderer.width *0.74, 580, "corazon").setDepth(20);
        this.j1v1.setScale(0.1);
        this.j1v2.setScale(0.1);
        this.j1v3.setScale(0.1);

        this.j2v1 = this.add.image(this.game.renderer.width *0.23, 580, "corazon").setDepth(20);
        this.j2v2 = this.add.image(this.game.renderer.width *0.27, 580, "corazon").setDepth(20);
        this.j2v3 = this.add.image(this.game.renderer.width *0.31, 580, "corazon").setDepth(20);
        this.j2v1.setScale(0.1);
        this.j2v2.setScale(0.1);
        this.j2v3.setScale(0.1);

        this.exAux1;
        this.esAux2;
        if (this.shipIndex1 == 2)
            this.esAux1 = 40;
        if (this.shipIndex1 == 3)
            this.esAux1 = 35;
        if (this.shipIndex1 == 4)
            this.esAux1 = 30;
        if (this.shipIndex2 == 2)
            this.esAux2 = 40;
        if (this.shipIndex2 == 3)
            this.esAux2 = 35;
        if (this.shipIndex2 == 4)
            this.esAux2 = 30;

        this.exhaust1 = this.add.sprite(this.jugador1.x, this.jugador1.y + this.esAux1, 'exhaust' + this.shipIndex1).setDepth(2).setRotation(-80).setScale(1.2);
        this.exhaust1.setVisible(false);
        this.exhaust1.anims.play('Exhaust' + this.shipIndex1);

        this.exhaust2 = this.add.sprite(this.jugador2.x, this.jugador2.y + this.esAux2, 'exhaust' + this.shipIndex2).setDepth(2).setRotation(-80).setScale(1.2);
        this.exhaust2.setVisible(false);
        this.exhaust2.anims.play('Exhaust' + this.shipIndex2);

        //Enemigos
        this.enemies = this.physics.add.group({
            classType: Enemigo,
            maxSize: 100,
            runChildUpdate: true
        });
        this.enemies.setDepth(5);

        this.time.addEvent({
            delay: 700,
            callback: function () {
                var aux = Phaser.Math.Between(0,100);
                if (aux < 50){
                    this.enemy = new Enemigo1(this, Phaser.Math.Between(15, this.game.config.width-15), 0, 'enemy');
                    this.enemies.add(this.enemy);
                }else if (aux >=50 && aux < 80){
                    this.enemy = new Enemigo3(this, Phaser.Math.Between(15, this.game.config.width-15), 0, 'enemy3');
                    this.enemies.add(this.enemy);
                }else{
                    this.enemy = new Enemigo2(this, Phaser.Math.Between(15, this.game.config.width-15), 0, 'enemy2');
                    this.enemies.add(this.enemy);
                }
                
            },
            callbackScope: this,
            loop: true
        });
        console.log(this.enemies);

        //Deteccion de colisiones
        //Entre jugadores
        this.physics.add.collider(this.jugador1, this.jugador2);
        //Entre enemigo y jugadores
        this.physics.add.collider(this.enemies, [this.jugador1, this.jugador2], this.collissionHandlerJugador, null, this);
        //Entre balas y enemigos
        this.physics.add.collider(this.enemies, [bullets, bullets2], this.collissionHandlerEnemy, null, this);
        //Entre balas y jugadores
        this.physics.add.collider(this.jugador1, [bullets, bullets2], this.collissionHandler, null, this);
        this.physics.add.collider(this.jugador2, [bullets, bullets2], this.collissionHandler, null, this);

        //Timer de partida y cuenta atras
        this.tiempo = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        this.tiempopartida = this.time.delayedCall(this.initialTime * 1000, this.onEvent2, [], this);
    }
    update(time, delta) {
        if (this.jugador2.vidas ==2){
            this.j2v3.setVisible(false).setActive(false);
        }
        if (this.jugador1.vidas ==2){
            this.j1v3.setVisible(false).setActive(false);
        }

        if (this.jugador2.vidas ==1){
            this.j2v2.setVisible(false).setActive(false);
        }
        if (this.jugador1.vidas ==1){
            this.j1v2.setVisible(false).setActive(false);
        }

        this.enemies.setVelocity(0,150);

        this.j1puntos.setText("J1: " + this.jugador1.puntuacion);
        this.j2puntos.setText("J2: " + this.jugador2.puntuacion);

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
            this.exhaust1.setY(this.jugador1.y + this.esAux1).setVisible(true);
        }
        else if (this.cursor.down.isDown) {
            this.jugador1.moveDown();
            this.exhaust1.setY(this.jugador1.y + this.esAux1).setVisible(true);
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
            this.exhaust2.setY(this.jugador2.y + this.esAux2).setVisible(true);
        }
        else if (this.keys.S.isDown) {
            this.jugador2.moveDown();
            this.exhaust2.setY(this.jugador2.y + this.esAux2).setVisible(true);
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

        if(this.jugador1.vidas <=0 || this.jugador2.vidas<=0){
            if(this.jugador1.vidas<=0){
                this.muerto = 1;
            }else{
                this.muerto = 2;
            }
            this.scene.start(sceneManager.SCENES.SCORE, { score: this.jugador1.puntuacion, score2: this.jugador2.puntuacion, enemigos1: this.jugador1.bajas, enemigos2: this.jugador2.bajas, muerto: this.muerto});
        }
    }

    collissionHandler(obj1, obj2) {
        console.log("colision");
        obj1.setVelocity(0);
        obj2.setActive(false).setVisible(false).setPosition(-5000, -5000);

    }

    collissionHandlerJugador(obj1, obj2) {
        console.log("colision");
        obj1.setVelocity(0);
        obj1.vidas-=1;
        obj2.setActive(false).setVisible(false).setPosition(-5000, -5000);

    }

    collissionHandlerEnemy(obj1, obj2) {
        console.log("colision con enemigo");
        obj1.setVelocity(0);
        //obj2.play('AnimationExplosion');
        //obj2.setScale(0.8).setVelocity(0);

        var expl = explosions.get();
        if (expl){
            expl.aparecer(obj1.x,obj1.y);

            this.time.addEvent({
                delay: 500,
                callback: function () {
                    expl.setActive(false).setVisible(false);
                },
            });
        }


        //Recibir daño
        obj1.recibirDaño();

        if (obj1.vida <= 0) {
            if (obj2.jugador == 1) {
                if (obj1.tipo == 1){
                    this.jugador1.puntuacion += 10;
                }else if (obj1.tipo == 2){
                    this.jugador1.puntuacion += 30;
                }else if (obj1.tipo == 3){
                    this.jugador1.puntuacion += 5;
                }
                this.jugador1.bajas += 1;
                console.log(this.jugador1.puntuacion);
            } else {
                if (obj1.tipo == 1){
                    this.jugador2.puntuacion += 10;
                }else if (obj1.tipo == 2){
                    this.jugador2.puntuacion += 30;
                }else if (obj1.tipo == 30){
                    this.jugador2.puntuacion += 5;
                }
                this.jugador2.bajas += 1;
                console.log(this.jugador2.puntuacion);
            }
        }

        obj2.setPosition(-500, -500);
    }
}