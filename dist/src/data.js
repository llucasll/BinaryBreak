import objects from "./gameObjects.js";
import config from "./lib/engine/config.js";
import * as mechanics from './mechanics.js';

let bricks = 0; // TODO refactor?

const data = {
	get score () {
		return Number(objects.score.text);
	},
	set score (val) {
		objects.score.text = String(val).padStart(config.scoreLength, '0');
	},
	get lives () {
		return Number(objects.lives.count.text.slice(1));
	},
	set lives (val) {
		if (val < 0) {
			mechanics.lose();
			return;
		}
		
		objects.lives.count.text = 'x' + val;
	},
	
	get bricks () {
		return bricks;
	},
	set bricks (val) {
		bricks = val;
		
		if (bricks <= 0)
			mechanics.win();
	},
};

if (config.development?.debug) {
	window.data = data;
}

export default data;
