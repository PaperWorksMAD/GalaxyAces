/** @type {import ("../typings/phaser") */

import {PreLoad} from "./scenes/PreLoad.js";
import {MainMenu} from "./scenes/MainMenu.js";
let game = new Phaser.Game({
	width: 800,
	height: 600,
	scene:[
		PreLoad, MainMenu
	]
});
