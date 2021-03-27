import objects from "./gameObjects.js";

export const configs = await (await fetch("config.json")).json();

const data = {
	get score () {
		return Number(objects.score.text);
	},
	set score (val) {
		objects.score.text = String(val).padStart(3, '0');
	}
};

export default data;
