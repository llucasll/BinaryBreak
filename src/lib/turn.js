import { signal } from "./utils.js";

let fps = 24;
let timeoutID;

export const moving = [];

export const setFps = rate => fps = rate;

export function start (now=Date.now()) {
	timeoutID = setTimeout(turn, 1/fps, now);
}

export function pause () {
	clearTimeout(timeoutID);
}

function turn (lastTime) {
	const now = Date.now();
	const elapsed = (now - lastTime) / 1000;
	
	for (const object of moving) {
		const hip = object.vel;
		const tan = object.angle;
		const sign = signal(tan);
		
		const sin = sign * (tan**-2 + 1) ** -(1/2);
		const cos = sign * (tan**2 + 1) ** -(1/2);
		
		const velx = cos * hip;
		const vely = sin * hip;
		
		object.move(velx*elapsed, vely*elapsed);
	}
	
	start(now);
}
