import { sceneManager } from "../sceneManager.js";
export class Config extends Phaser.Scene {
    constructor() {
        super({
            key: sceneManager.SCENES.CONFIG
        })
    }
    init(data) {
        this.musicamenu = data;
        
    }
    create() {
        this.volume = this.musicamenu.volume;
        this.config = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "configuracion").setDepth(2);
        this.vol = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.45, "volumen").setDepth(2);
        this.config.setScale(0.75);
        this.vol.setScale(0.5);
        let xbt= this.add.image(this.game.renderer.width-50, this.game.renderer.height-550, "x").setDepth(2);
        xbt.setInteractive();
		xbt.on("pointerup",()=>{
			this.scene.start(sceneManager.SCENES.MAINMENU);
        })
        console.log(this.volume);
        let mup= this.add.image(this.game.renderer.width/2+30, this.game.renderer.height*0.55, "+").setDepth(2);
        mup.setInteractive();
		mup.on("pointerup",()=>{
            console.log("presionado");
            if(this.volume < 1){
            this.volume += 0.1;
            console.log(this.volume);
            }
        })

        let mdown= this.add.image(this.game.renderer.width/2-30, this.game.renderer.height*0.55, "-").setDepth(2);
        mdown.setInteractive();
		mdown.on("pointerup",()=>{
            if(this.volume > 0){
            this.volume = this.volume/2;
            console.log(this.volume);
            }
        })
        
        this.fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);    
    }
    update() {
        this.musicamenu.setVolume(this.volume);
        this.fondo.tilePositionX -= 1;
        this.fondo.tilePositionY -= 1;
    }
}