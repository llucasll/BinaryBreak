import Native from "./lib/Native.js";
import Entity from "./lib/Entity.js";

import * as engine from './lib/engine.js';
import * as keyboard from "./lib/keyboard.js";

import { Pad, Pad2 } from "./profile/Pad.js";
import { Ball } from "./profile/Ball.js";
import { Brick, SolidBrick, HardBrick } from "./profile/Brick.js";
import { rand } from "./lib/utils.js";

document.title = 'Binary Break';

Entity.board = Native('div', {
	parent: document.body,
	style: {
		width: '80vmin',
		height: '80vmin',
		
		position: 'relative',
		
		border: '1px solid blue',
	},
});

const pad = new Entity(Pad);
const ball = new Entity(Ball);

const bricks = [];
for (let j=0; j<Brick.amount.y; j++) {
	bricks[j] = [];
	for (let i=0; i<Brick.amount.x; i++) {
		bricks[j][i] = Brick.insertBrick(i, j, rand([ Brick, Brick, Brick, SolidBrick, HardBrick ]));
	}
}
console.log(bricks);

keyboard.setKeydownListener({
	ArrowLeft: _ => pad.move(-1),
	ArrowRight: _ => pad.move(1),
	' ': _ => console.log('hi!'),
	g: _ => pad.profile = Pad2,
	w: _ => pad.profile = Pad,
	x: _ => ball.profile = Pad,
});

engine.start();
