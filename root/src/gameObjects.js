import Entity from "./lib/engine/Entity.js";
import { Pad } from "./profile/Pad.js";
import { Ball } from "./profile/Ball.js";
import data from "./data.js";
import { Brick, HardBrick, SolidBrick, SpecialBrick } from "./profile/Brick.js";
import { rand } from "./lib/utils.js";
import config from "./lib/engine/config.js";

const objects = {};

export default objects;

export function init () {
	Object.assign(objects, {
		lives: new Entity(null, { pos: [ 3, 1.5 ] }),
		score: new Entity(null, { pos: [ 86, 1.5 ] }),
		
		pad: new Entity(Pad, { pos: [ 45 , 95 ] }),
		balls: [ new Entity(Ball) ],
		bricks: [],
		items: [],
	});
	
	objects.balls[0].profile.init();

	if (config.debug) {
		Object.assign(window, objects);
		window.objects = objects;
	}
	
	Object.assign(data, {
		score: 0,
		lives: config.initialLives,
	});
	
	for (let j=0; j<config.bricks.amount.y; j++) {
		objects.bricks[j] = [];
		for (let i=0; i<config.bricks.amount.x; i++) {
			objects.bricks[j][i] = Brick.insertBrick(i, j, rand([ Brick, Brick, Brick, SolidBrick, HardBrick, SpecialBrick ]));
		}
	}
}
