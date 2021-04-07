window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM fully loaded and parsed');
});

import * as engine from './lib/engine/engine.js';
import * as keyboard from "./lib/engine/keyboard.js";
import Board from "./lib/engine/Board.js";

import config from "./lib/engine/config.js";
import objects, { init } from "./gameObjects.js";

import { Pad, Pad2 } from "./profile/Pad.js";
import { keepInRange, rand } from "./lib/utils.js";
import Native from "./lib/Native.js";

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

const audio = Native('audio', { // or video
	parent: document.body,
	props: {
		// autoplay: true,
		// controls: true,
		// muted: true,
		loop: true,
	},
	children: Native('source', {
		props: {
			src: 'media/1. Downtown Owl - Just Chillin  (320).mp3',
			type: 'audio/mpeg',
		},
	}),
});
// await audio.play();
// audio.muted = false;
window.audio = audio;
window.onclick = _ => audio.play();
// document.onload = _ => {
// 	console.log('loaded');
// 	audio.play();
// }
audio.onvolumechange = _ => console.log(audio.volume);

keyboard.setKeydownListener({
	ArrowLeft: _ => objects.pad.acceleration = [ -50, 0, 50, 0 ],
	ArrowRight: _ => objects.pad.acceleration = [ 50 , 0, 50, 0 ],
	' ': _ => {
		audio.play();
		
		if (objects.pad.stalker === objects.balls[0]) {
			const angle = objects.pad.relativePosition(objects.balls[0]);
			
			objects.balls[0].profile.updateSpeedAngle(angle, 30);
		}
		delete objects.pad.stalker;
	},
	g: _ => objects.pad.profile = Pad2,
	w: _ => objects.pad.profile = Pad,
	x: _ => objects.balls[0].profile = Pad,
	m: _ => audio.paused? audio.play() : audio.pause(),
	p: _ => engine.running? engine.pause() : engine.start(),
	// '-': _ => audio.volume -= .1,
	// '+': _ => audio.volume += .1,
	'-': _ => audio.volume = keepInRange(audio.volume - .1, 0, 1),
	'+': _ => audio.volume = keepInRange(audio.volume + .1, 0, 1),
});

keyboard.setKeyupListener({
	ArrowLeft: _ => objects.pad.acceleration = [ 75, 0, 0, 0 ],
	ArrowRight: _ => objects.pad.acceleration = [ -75, 0, 0, 0 ],
});

engine.start();
