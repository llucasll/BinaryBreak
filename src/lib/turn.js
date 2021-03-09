let fps = 24;
let timeoutID;

export const moving = [];
export const registered = [];

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
	
	for (const obj of moving) {
		obj.move(obj.speed.x * elapsed, obj.speed.y * elapsed);
	}
	for (const obj of registered) {
		obj.turn?.(elapsed);
	}
	
	start(now);
}
