import { configs } from "../../data.js";

let fps = configs.fps;
let timeoutID;

export const entities = [];
export const moving = [];
export const accelerating = [];
// export const animated = [];

export const setFps = rate => fps = rate;
export const getFps = _ => fps;

export function start (now=Date.now()) {
	timeoutID = setTimeout(turn, 1000/fps, now);
}

export function pause () {
	clearTimeout(timeoutID);
}

/**
 * Engine's heart. This function executes each 'frame', defined from fps variable.
 */
function turn (lastTime) {
	const now = Date.now();
	const elapsed = (now - lastTime) / 1000;
	
	for (const obj of accelerating) {
		obj.accelerate(
			[ obj.acceleration.x * elapsed, obj.acceleration.y * elapsed ],
			[ obj.acceleration.maxX, obj.acceleration.maxY ]
		);
	}
	for (const obj of moving) {
		obj.move(obj.speed.x * elapsed, obj.speed.y * elapsed);
		
		for (const testing of entities) {
			obj.checkCollision(testing);
		}
		if (obj.stalker) {
			obj.stalker.move(obj.speed.x * elapsed, obj.speed.y * elapsed);
		}
	}
	for (const obj of entities) {
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
