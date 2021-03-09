import { Movement } from "./Movement.js";

export default class Profile {
	static defaults = {};
	
	#entity;
	get entity () { return this.#entity }
	
	constructor (entity) {
		this.#entity = entity;
		
		Object.assign(entity, this.constructor.defaults);
	}
}

export class Pad extends Profile {
	static defaults = {
		size: [ 10, 2 ],
		color: 'white',
		pos: [ 45 , 95 ],
	};
}
Pad.prototype.move = Movement.stop;
export class Pad2 extends Profile {
	static defaults = {
		// size: [ 10, 2 ],
		color: 'green',
		// pos: [ 45 , 95 ],
	};
}

export class Ball extends Profile {
	static defaults = {
		size: [ 10, 10 ],
		pos: [ 45, 45 ],
		image: 'ball',
		speed: [ 20, 10 ],
	};
}
Ball.prototype.move = Movement.bounce;
