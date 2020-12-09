import { sceneManager } from "../sceneManager.js";

var volumeon = true;
let voloff;
let volon;
let efecoff;
let efecon;
export class Config extends Phaser.Scene {
    constructor() {
        super({
            key: sceneManager.SCENES.CONFIG
        })
    }
    init(data) {
        this.musicamenu = data.music;
        this.efectoson = data.efSound;
        this.efvol = data.efvol;
    }
    create() {
        console.log(this.efvol);
        this.efvol = 0.5;
        this.volume = this.musicamenu.volume;
        this.config = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "configuracion").setDepth(2);
        this.vol = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.55, "volumen").setDepth(2);
        this.mus = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.35, "musica").setDepth(2);
        this.config.setScale(0.75);
        this.vol.setScale(0.5);
        this.mus.setScale(0.55);
        let xbt= this.add.image(this.game.renderer.width-50, this.game.renderer.height-550, "x").setDepth(2);
        xbt.setInteractive();
		xbt.on("pointerup",()=>{
			this.scene.start(sceneManager.SCENES.MAINMENU, {efSound: this.efectoson, efvol: this.efvol});
        })
        console.log(this.volume);
        let mup= this.add.image(this.game.renderer.width/2+50, this.game.renderer.height*0.65, "+").setDepth(2);
        mup.setInteractive();
		mup.on("pointerup",()=>{
            console.log("presionado");
            if(this.volume < 1){
            this.efvol += 0.1;
            this.volume += 0.1;
            console.log(this.volume);
            console.log(this.efvol);
            }
        })

        let mdown= this.add.image(this.game.renderer.width/2-50, this.game.renderer.height*0.65, "-").setDepth(2);
        mdown.setInteractive();
		mdown.on("pointerup",()=>{
            if(this.volume > 0){
            this.efvol = this.efvol/2;
            this.volume = this.volume/2;
            console.log(this.volume);
            console.log(this.efvol);
            }
        })

        this.add.bitmapText(this.game.renderer.width / 2 -30, this.game.renderer.height*0.45-10, "bit", "On", 24).setDepth(10);
        volon = this.add.image(this.game.renderer.width/2-50, this.game.renderer.height*0.45, "cajaon").setDepth(2);
        volon.setInteractive();
		volon.on("pointerup",()=>{
            voloff.setTexture("caja")
            volon.setTexture("cajaon")
            this.musicamenu.resume();
            volumeon = true;
        })


        this.add.bitmapText(this.game.renderer.width / 2+70, this.game.renderer.height*0.45-10, "bit", "Off", 24).setDepth(10);
        voloff = this.add.image(this.game.renderer.width/2+50, this.game.renderer.height*0.45, "caja").setDepth(2);
        voloff.setInteractive();
		voloff.on("pointerup",()=>{
            volon.setTexture("caja")
            voloff.setTexture("cajaon")
            this.musicamenu.pause();
            volumeon = false;
        })

        //Activar, desacticar efectos de sonido
        this.efec = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.75, "efectossonido").setDepth(2).setScale(0.5);

        this.add.bitmapText(this.game.renderer.width / 2 -30, this.game.renderer.height*0.85-10, "bit", "On", 24).setDepth(10);
        efecon = this.add.image(this.game.renderer.width/2-50, this.game.renderer.height*0.85, "cajaon").setDepth(2);
        efecon.setInteractive();
		efecon.on("pointerup",()=>{
            efecoff.setTexture("caja")
            efecon.setTexture("cajaon")
            this.efectoson = true;
            
        })


        this.add.bitmapText(this.game.renderer.width / 2+70, this.game.renderer.height*0.85-10, "bit", "Off", 24).setDepth(10);
        efecoff = this.add.image(this.game.renderer.width/2+50, this.game.renderer.height*0.85, "caja").setDepth(2);
        efecoff.setInteractive();
		efecoff.on("pointerup",()=>{
            efecon.setTexture("caja")
            efecoff.setTexture("cajaon")
            this.efectoson = false;
        })
        
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);    
    }
    update() {
        if (volumeon == true){
            voloff.setTexture("caja");
            volon.setTexture("cajaon");
        }else{
            voloff.setTexture("cajaon");
            volon.setTexture("caja");
        }

        if (this.efectoson == true){
            efecoff.setTexture("caja");
            efecon.setTexture("cajaon");
        }else{
            efecoff.setTexture("cajaon");
            efecon.setTexture("caja");
        }

        this.musicamenu.setVolume(this.volume);
        this.fondo.tilePositionX -= 1;
        this.fondo.tilePositionY -= 1;
    }
}