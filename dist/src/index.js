window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM fully loaded and parsed'); // TODO
});

import * as engine from './lib/engine/engine.js';
import * as keyboard from "./lib/engine/keyboard.js";
import Board from "./lib/engine/Board.js";

import config from "./lib/engine/config.js";
import objects, { init } from "./gameObjects.js";

import { keepInRange, rand } from "./lib/utils.js";
import Native from "./lib/Native.js";

document.title = 'Binary Break';

// <link rel="shortcut icon" href="img/favicon.ico">
Native('link', {
	parent: document.head,
	props: {
		rel: "shortcut icon",
		href: "media/favicon.png",
	},
})

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
			src: 'media/1. Downtown Owl - Just Chillin  (320).ogg',
			type: 'audio/ogg',
		},
	}),
});

let audioStarted = config.development?.disableMusic;

function startAudio () {
	if (audioStarted)
		return;
	
	audio.play();
	audioStarted = true;
}

// await audio.play();
// audio.muted = false;

window.audio = audio;
// window.onclick = _ => startAudio();

// document.onload = _ => {
// 	console.log('loaded');
// 	audio.play();
// }
if (config.development?.debug) {
	audio.onvolumechange = _ => console.log(audio.volume);
}

// TODO move to mechanics
const start = (startMusic = true) => {
	if (startMusic)
		startAudio();
	
	if (objects.pad.stalker === objects.balls[0]) {
		const angle = objects.pad.relativePosition(objects.balls[0]);
		objects.balls[0].profile.updateSpeedAngle(angle, 30);
		
		delete objects.pad.stalker;
	}
};
window.onclick = start;

const left = _ => objects.pad.acceleration = [ -50, 0, 50, 0 ];
const right = _ => objects.pad.acceleration = [ 50 , 0, 50, 0 ];
const slowDown = _ => objects.pad.acceleration = [ 75 * -Math.sign(objects.pad.speed.x), 0, 0, 0 ];

keyboard.setKeydownListener({
	ArrowLeft: left,
	ArrowRight: right,
	' ': start,
	m: _ => audio.paused? audio.play() : audio.pause(),
	p: _ => engine.running? engine.pause() : engine.start(),
	// '-': _ => audio.volume -= .1,
	// '+': _ => audio.volume += .1,
	'-': _ => audio.volume = keepInRange(audio.volume - .1, 0, 1),
	'+': _ => audio.volume = keepInRange(audio.volume + .1, 0, 1),
});

keyboard.setKeyupListener({
	ArrowLeft: slowDown,
	ArrowRight: slowDown,
});

let touch;
let padDirection;
window.addEventListener('touchstart', e => {
	const { clientX: x, clientY: y } = e.changedTouches[0];
	touch = { x, y };
	
	// start(false); // TODO remove this flag?
});
window.addEventListener('touchmove', e => {
	// const { clientX: x, clientY: y } = [ ...e.changedTouches ].pop();
	// const { clientX: x, clientY: y } = Array.prototype.pop.call(e.changedTouches);
	const { clientX: x, clientY: y } = e.changedTouches[e.changedTouches.length - 1];
	
	if (x > touch.x)
		right();
	else
		left();
	padDirection = Math.sign(x - touch.x);
});
window.addEventListener('touchend', _ => {
	// debugger
	// audio.play();
	// start(false); // TODO remove this flag?
	slowDown();
});

// document.body.style.background = 'currentColor';
// document.body.animate([
// 	{
// 		color: 'black',
// 	},
// 	{
// 		color: 'white',
// 	},
// ], {
// 	duration: 1000,
// 	fill: "forwards",
// 	// playState: 'paused',
// }).pause();
//
// pad.element.style.backgroundImage =
// 	// 'radial-gradient(#FFFFFF -150%, blue 100%)';
// 	'radial-gradient(blue 0%, #FFFFFF 500%)';

engine.start();
