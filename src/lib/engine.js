import { collided } from "./Shape.js";

let fps = 30;
let timeoutID;

export const moving = [];
export const registered = [];

export const setFps = rate => fps = rate;

export function start (now=Date.now()) {
	timeoutID = setTimeout(turn, 1000/fps, now);
}

export function pause () {
	clearTimeout(timeoutID);
}

function turn (lastTime) {
	const now = Date.now();
	const elapsed = (now - lastTime) / 1000;
	
	for (const obj of moving) {
		obj.move(obj.speed.x * elapsed, obj.speed.y * elapsed);
		
		for (const testing of registered) {
			const result = collided[obj.shape]?.[testing.shape]?.(obj, testing)
				|| collided[testing.shape]?.[obj.shape]?.(testing, obj)
			if (result) {
				obj.profile.collided?.(testing);
				testing.profile.collided?.(obj);
			}
		}
	}
	for (const obj of registered) {
		obj.profile?.turn?.(elapsed);
	}
	
	start(now);
}
