import objects from "./gameObjects.js";
import config from "./lib/engine/config.js";
import Entity from "./lib/engine/Entity.js";

const privateProps = {
	livesChildren: [],
};

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
		
		objects.lives.size = [ 6*val, 6 ];
		
		if (difference > 0)
			for (let i=0; i<difference; i++) {
				const entity = new Entity(null, { image: 'ball' });
				privateProps.livesChildren.push(entity)
				objects.lives.element.append(entity.element);
			}
		if (difference < 0)
			for (let i=0; i<-difference; i++)
				objects.lives.element.removeChild(objects.lives.element.lastChild);
		
		for (let [ i, child ] of privateProps.livesChildren.entries())
			Object.assign(child, {
				size: [ 100/val, 100 ],
				pos: [ 100*i/val ],
			});
		
		privateProps.lives = val;
	},
};

if (config.debug) {
	window.data = data;
}

export default data;
