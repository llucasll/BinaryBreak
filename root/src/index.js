import Native from "./lib/Native.js";

import Entity from "./lib/engine/Entity.js";

import * as engine from './lib/engine/engine.js';
import * as keyboard from "./lib/engine/keyboard.js";

import objects, { init } from "./gameObjects.js";

import { Pad, Pad2 } from "./profile/Pad.js";
import { rand } from "./lib/utils.js";
import config from "./lib/engine/config.js";

document.title = 'Binary Break';

Entity.board = Native('div', {
	parent: document.body,
	props: {
		className: 'board',
	},
	style: {
		backgroundImage:
			'url('
			+ config.media.prefix
			+ rand([
				/* ELIMINATED ROUND 1 */
				// 'background/abstract',
				// 'background/fast',
				// 'background/horizontal',
				
				/* ELIMINATED ROUND 2 */
				// 'background/code',
				// 'background/anotherAlphabet',
				// 'background/dataConcept',
				
				/* ELIMINATED ROUND 3 */
				// 'background/movingAway',
			
				/* FINALISTS */
				'background/small',
				'background/simple', // standard
			])
			+ '.gif)',
	},
});

init();

keyboard.setKeydownListener({
	ArrowLeft: _ => objects.pad.acceleration = [ -50, 0, 50, 0 ],
	ArrowRight: _ => objects.pad.acceleration = [ 50 , 0, 50, 0 ],
	' ': _ => {
		//ball.die();
		//ball = new Entity(Ball);
		if (objects.pad.stalker === objects.balls[0])
			objects.balls[0].speed = [ 20, -10 ];
		objects.pad.stalker = null;
	},
	g: _ => objects.pad.profile = Pad2,
	w: _ => objects.pad.profile = Pad,
	x: _ => objects.balls[0].profile = Pad,
});

keyboard.setKeyupListener({
	ArrowLeft: _ => objects.pad.acceleration = [ 75, 0, 0, 0 ],
	ArrowRight: _ => objects.pad.acceleration = [ -75, 0, 0, 0 ],
});

engine.start();
