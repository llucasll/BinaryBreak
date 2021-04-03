import Entity from "./lib/engine/Entity.js";
import { Pad } from "./profile/Pad.js";
import { Ball } from "./profile/Ball.js";
import data from "./data.js";
import { Brick, HardBrick, SolidBrick, SpecialBrick } from "./profile/Brick.js";
import { rand } from "./lib/utils.js";

const objects = {};

export default objects;

export function init () {
	Object.assign(objects, {
		pad: new Entity(Pad),
		balls: [ new Entity(Ball) ],
		bricks: [],
		
		score: new Entity(null, { x: 80 }),
	});
	
	objects.balls[0].profile.init();

	// TODO if debug
	Object.assign(window, objects);
	window.objects = objects;
	
	Object.assign(data, {
		score: 0,
	});
	
	for (let j=0; j<Brick.amount.y; j++) {
		objects.bricks[j] = [];
		for (let i=0; i<Brick.amount.x; i++) {
			objects.bricks[j][i] = Brick.insertBrick(i, j, rand([ SpecialBrick ]));
		}
	}
}
