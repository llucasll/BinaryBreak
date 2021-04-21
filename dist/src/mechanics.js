import * as engine from './lib/engine/engine.js';
import * as keyboard from "./lib/engine/keyboard.js";
import Entity from "./lib/engine/Entity.js";

import objects from "./gameObjects.js";

import { End } from "./profile/Header.js";

export function restart () {
	window.location.reload(); // TODO
}

function end (message) {
	engine.pause();
	
	objects.end = new Entity(End, {
		text: message,
		center: [ 50, 50 ],
	});
	
	window.onclick = restart;
	keyboard.setKeyupListener({
		' ': restart,
	});
}

export function win () {
	end('You win!');
}

export function lose () {
	end('You lose!');
}
