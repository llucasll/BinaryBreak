import config from "./config.js";
import { testCollision } from "./Shape.js";

import Entity from "./Entity.js";
import { softInterval, stepChronometer } from "../timer.js";

let fps = config.fps;
let actualFps;

// TODO move to Entity
export const moving = [];
export const accelerating = [];
// export const animated = [];

export const setFps = rate => fps = rate;
export const getFps = _ => fps;
export const getActualFps = _ => actualFps;

export let running = false;

let dtime;

/**
 * It only resolves when the engine is stopped
 * @return {Promise<void>} when the engine is paused
 */
export async function start () {
	dtime = stepChronometer();
	running = true;
	await softInterval(turn, 1000/fps);
}

export function pause () {
	running = false;
}

/**
 * Engine's heart. This function executes each 'frame', defined from fps variable.
 */
async function turn () {
	if (!running)
		return true;
	
	const elapsed = dtime() / 1000;
	actualFps = 1/elapsed;
	
	for (const obj of accelerating) {
		obj.accelerate(
			[ obj.acceleration.x * elapsed, obj.acceleration.y * elapsed ],
			[ obj.acceleration.maxX, obj.acceleration.maxY ]
		);
	}
	out: for (const obj of moving) {
		obj.move(obj.speed.x * elapsed, obj.speed.y * elapsed);
		
		for (const testing of Entity.all) {
			if (obj === testing)
				continue;
			
			if (testCollision(obj, testing)) {
				const { speed } = obj;
				
				const keepPos = await obj.collide(testing);
				
				if (testing.dead)
					continue;
				
				if (obj.dead)
					continue out;
				
				if (!keepPos)
					obj.profile?.uncollide(testing, speed);
				
				// obj.ignoreColliders.colliding.push(testing);
				// testing.ignoreColliders.colliding.push(obj);
			}
			// else {
				// removeFromArray(obj.ignoreColliders.colliding, testing);
				// removeFromArray(testing.ignoreColliders.colliding, obj);
			// }
		}
		if (obj.stalker) { // TODO array? and mirror "stalking"?
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
}
