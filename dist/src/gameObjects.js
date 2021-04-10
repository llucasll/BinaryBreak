import Entity from "./lib/engine/Entity.js";
import { Pad } from "./profile/Pad.js";
import { Ball } from "./profile/Ball.js";
import data from "./data.js";
import { Brick, HardBrick, SolidBrick, SpecialBrick } from "./profile/Brick.js";
import { rand } from "./lib/utils.js";
import config from "./lib/engine/config.js";
import { BottomWall, HorizontalWall, VerticalWall } from "./profile/Wall.js";

const objects = {};

export default objects;

export function init () {
	Object.assign(objects, {
		lives: new Entity(null, { pos: [ 3, 1.5 ] }),
		score: new Entity(null, { pos: [ 86, 1.5 ] }),
		
		pad: new Entity(Pad, { y: 95, center: [ 50 ] }),
		balls: [ new Entity(Ball) ],
		bricks: [],
		items: [],
		
		wall: {
			top: new Entity(HorizontalWall),
			left: new Entity(VerticalWall),
			right: new Entity(VerticalWall, { x: 100 - config.size.wall, }),
			bottom: new Entity(BottomWall, { y: 100 - config.size.wall, }),
			div: new Entity(HorizontalWall, { y: config.bricks.area.dy - config.bricks.margin*2 }),
		},
	});
	
	objects.balls[0].profile.init();

	if (config.development?.debug) {
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
