import objects from "./gameObjects.js";
import config from "./lib/engine/config.js";
import Entity from "./lib/engine/Entity.js";

const privateProps = {};

const data = {
	get score () {
		return Number(objects.score.text);
	},
	set score (val) {
		objects.score.text = String(val).padStart(config.scoreLength, '0');
	},
	get lives () {
		return privateProps.lives || 0;
	},
	set lives (val) {
		const difference = val - this.lives;
		
		objects.lives.size = [ 8*val, 8 ];
		
		if (difference > 0)
			for (let i=0; i<difference; i++)
				objects.lives.element.append(new Entity(null, {
					image: 'floppy',
					size: [ 100/val, 100 ],
					pos: [ 100*i/val ],
				}).element);
		if (difference < 0)
			for (let i=0; i<-difference; i++)
				objects.lives.element.removeChild(objects.lives.element.lastChild);
	},
};

if (config.debug) {
	window.data = data;
}

export default data;
