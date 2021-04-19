import objects from "./gameObjects.js";
import config from "./lib/engine/config.js";

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
			// TODO
		}
		
		objects.lives.count.text = 'x' + val;
	},
};

if (config.development?.debug) {
	window.data = data;
}

export default data;
