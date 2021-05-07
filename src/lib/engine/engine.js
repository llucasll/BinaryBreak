import config from "./config.js";
import { testCollision } from "./Shape.js";

import Entity from "./Entity.js";

let fps = config.fps;
let actualFps;
let timeoutID;

export const moving = [];
export const accelerating = [];
// export const animated = [];

export const setFps = rate => fps = rate;
export const getFps = _ => fps;
export const getActualFps = _ => actualFps;

export let running = false;

export function start (now=Date.now()) {
	timeoutID = setTimeout(turn, 1000/fps, now);
	running = true;
}

export function pause () {
	clearTimeout(timeoutID);
	running = false;
}

/**
 * Engine's heart. This function executes each 'frame', defined from fps variable.
 */
function turn (lastTime) {
	const now = Date.now();
	const elapsed = (now - lastTime) / 1000;
	actualFps = 1/elapsed;
	
	for (const obj of accelerating) {
		obj.accelerate(
			[ obj.acceleration.x * elapsed, obj.acceleration.y * elapsed ],
			[ obj.acceleration.maxX, obj.acceleration.maxY ]
		);
	}
	for (const obj of moving) {
		obj.move(obj.speed.x * elapsed, obj.speed.y * elapsed);
		
		for (const testing of Entity.all) {
			if (obj === testing)
				continue;
			
			if (testCollision(obj, testing)) {
				const { speed } = obj;
				if (!obj.collide(testing))
					obj.profile?.uncollide(testing, speed);
				
				// obj.ignoreColliders.colliding.push(testing);
				// testing.ignoreColliders.colliding.push(obj);
			}
			// else {
				// removeFromArray(obj.ignoreColliders.colliding, testing);
				// removeFromArray(testing.ignoreColliders.colliding, obj);
			// }
		}
		if (obj.stalker) {
			obj.stalker.move(obj.speed.x * elapsed, obj.speed.y * elapsed);
		}
	}
	for (const obj of Entity.all) {
		obj.profile?.act?.(elapsed);
	}
	// for (const obj of animated) {
	// 	const { entity, arr, fps, timeout, callback } = obj;
	//
	// 	if (!arr) {
	// 		if (callback.call(entity, elapsed))
	// 			removeFromArray(animated, obj);
	// 		return;
	// 	}
	//
	// 	entity.image = arr[obj.i++];
	// }
	
	start(now);
}
