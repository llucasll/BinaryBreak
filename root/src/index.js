import Native from "./lib/Native.js";
import Entity from "./lib/engine/Entity.js";

import * as engine from './lib/engine/engine.js';
import * as keyboard from "./lib/engine/keyboard.js";

import { Pad, Pad2 } from "./profile/Pad.js";
import { Ball } from "./profile/Ball.js";
import { Brick, SolidBrick, HardBrick, SpecialBrick } from "./profile/Brick.js";
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
window.pad = pad;
let ball = new Entity(Ball);

pad.stalker = ball;
ball.pos = [ pad.x + pad.w/2 - ball.w/2, pad.y - ball.h ];

const bricks = [];
for (let j=0; j<Brick.amount.y; j++) {
	bricks[j] = [];
	for (let i=0; i<Brick.amount.x; i++) {
		bricks[j][i] = Brick.insertBrick(i, j, rand([ Brick, Brick, Brick, SolidBrick, HardBrick, SpecialBrick ]));
	}
}
console.log(bricks);

keyboard.setKeydownListener({
	ArrowLeft: _ => pad.acceleration = [ -50, 0, 50, 0 ],
	ArrowRight: _ => pad.acceleration = [ 50 , 0, 50, 0 ],
	' ': _ => {
		//ball.die();
		//ball = new Entity(Ball);
		if (pad.stalker === ball)
			ball.speed = [ 20, -10 ];
		pad.stalker = null;
	},
	g: _ => pad.profile = Pad2,
	w: _ => pad.profile = Pad,
	x: _ => ball.profile = Pad,
});

keyboard.setKeyupListener({
	ArrowLeft: _ => pad.acceleration = [ 75, 0, 0, 0 ],
	ArrowRight: _ => pad.acceleration = [ -75, 0, 0, 0 ],
});

engine.start();
