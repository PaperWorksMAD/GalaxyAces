import { sceneManager } from "../sceneManager.js";
export class Rrss extends Phaser.Scene {
    constructor() {
        super({
            key: sceneManager.SCENES.RRSS
        })
    }

    openExternalLink(aux){
        if (aux > 0){
            var url = 'https://www.instagram.com/paperworksmad/';
        }else{
            var url = 'https://twitter.com/PaperWorks20';
        }

        var s = window.open(url, '_blank');

        if (s && s.focus){
            s.focus();
        }else if (!s){
            window.location.href = url;
        }
    }

    init() {
    }
    create() {
        
        
        this.fondorrss = this.add.tileSprite(400, 300, 800, 600, 'fondo').setDepth(0);    
        this.instagram = this.add.image(this.game.renderer.width/2, 100, 'instagram').setDepth(1);
        this.instagramText = this.add.image(this.game.renderer.width/2, 250, 'instagramText').setDepth(1);
        this.twitter = this.add.image(this.game.renderer.width/2 - 10, 400, 'twitter').setDepth(1).setScale(0.8);
        this.twitterText = this.add.image(this.game.renderer.width/2, 550, 'twitterText').setDepth(1);

        this.instagram.setInteractive();
        this.twitter.setInteractive();

        //this.instagram.on('pointerup', this.openExternalLink(1), this);
        //this.twitter.on('pointerup', this.openExternalLink(0), this);
        this.instagram.on("pointerup",()=>{
            var url = 'https://www.instagram.com/paperworksmad/';
            var s = window.open(url, '_blank');

            if (s && s.focus){
                s.focus();
            }else if (!s){
                window.location.href = url;
            }
        })

        this.twitter.on("pointerup",()=>{
            var url = 'https://twitter.com/PaperWorks20';
            var s = window.open(url, '_blank');

            if (s && s.focus){
                s.focus();
            }else if (!s){
                window.location.href = url;
            }
        })

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