/** @type {import ("../typings/phaser") */

import {PreLoad} from "./scenes/PreLoad.js";
import {MainMenu} from "./scenes/MainMenu.js";
import {Game} from "./scenes/Game.js";
import {Config} from "./scenes/Config.js";
import {Rrss} from "./scenes/Rrss.js";
import {Controls} from "./scenes/Controls.js";
import {Score} from "./scenes/Score.js";
import {CharacterSelect} from "./scenes/CharacterSelect.js";

let game = new Phaser.Game({
	width: 800,
	height: 600,
	scene:[
		PreLoad, MainMenu, Game, Config, Rrss, Controls, CharacterSelect, Score
	],
	render:{
		pixelArt: true
	},
	physics:{
		default:'arcade',
		arcade:{
			gravity: { y: 0 },
            debug: true
		}
	}
});
