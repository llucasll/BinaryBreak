import * as engine from './lib/engine/engine.js';
import * as keyboard from "./lib/engine/keyboard.js";
import Board from "./lib/engine/Board.js";

import config from "./lib/engine/config.js";
import objects, { init } from "./gameObjects.js";

import { Pad, Pad2 } from "./profile/Pad.js";
import { rand } from "./lib/utils.js";

document.title = 'Binary Break';

new Board({ background:
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
});

init();

keyboard.setKeydownListener({
	ArrowLeft: _ => objects.pad.acceleration = [ -50, 0, 50, 0 ],
	ArrowRight: _ => objects.pad.acceleration = [ 50 , 0, 50, 0 ],
	' ': _ => {
		if (objects.pad.stalker === objects.balls[0]) {
			const angle = objects.pad.relativePosition(objects.balls[0]);
			
			objects.balls[0].profile.updateSpeedAngle(angle, 20);
		}
		delete objects.pad.stalker;
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
