import Entity from "./lib/engine/Entity.js";
import { Pad } from "./profile/Pad.js";
import { Ball } from "./profile/Ball.js";
import data from "./data.js";
import { Brick, HardBrick, SolidBrick } from "./profile/Brick.js";
import { rand } from "./lib/utils.js";

const objects = {};

export default objects;

export function init () {
	Object.assign(objects, {
		pad: new Entity(Pad),
		balls: [ new Entity(Ball) ],
		bricks: [],
		
		score: new Entity(),
	});
	
	objects.balls[0].pos = [ pad.x + pad.w/2 - objects.balls[0].w/2, pad.y - objects.balls[0].h ];
	objects.pad.stalker = objects.balls[0];

	// TODO if debug
	Object.assign(window, objects);
	
	Object.assign(data, {
		score: 0,
	})
	
	objects.score.x = 80;
	
	for (let j=0; j<Brick.amount.y; j++) {
		objects.bricks[j] = [];
		for (let i=0; i<Brick.amount.x; i++) {
			objects.bricks[j][i] = Brick.insertBrick(i, j, rand([ Brick, Brick, Brick, SolidBrick, HardBrick, SpecialBrick ]));
		}
	}
}
