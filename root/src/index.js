import Native from "./lib/Native.js";

import Entity from "./lib/engine/Entity.js";

import * as engine from './lib/engine/engine.js';
import * as keyboard from "./lib/engine/keyboard.js";

import { Pad, Pad2 } from "./profile/Pad.js";
import { Ball } from "./profile/Ball.js";

import objects, { init } from "./gameObjects.js";

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

init();

keyboard.setKeydownListener({
	ArrowLeft: _ => objects.pad.acceleration = [ -50, 0, 50, 0 ],
	ArrowRight: _ => objects.pad.acceleration = [ 50 , 0, 50, 0 ],
	' ': _ => objects.balls[0].die() || (objects.balls[0] = new Entity(Ball)),
	g: _ => objects.pad.profile = Pad2,
	w: _ => objects.pad.profile = Pad,
	x: _ => objects.balls[0].profile = Pad,
});

keyboard.setKeyupListener({
	ArrowLeft: _ => objects.pad.acceleration = [ 75, 0, 0, 0 ],
	ArrowRight: _ => objects.pad.acceleration = [ -75, 0, 0, 0 ],
});

engine.start();
