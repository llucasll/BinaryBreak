import { Movement } from "../lib/Movement.js";
import Profile from "../lib/Profile.js";
import Shape from "../lib/Shape.js";

export class Pad extends Profile {
	static defaults = {
		size: [ 10, 2 ],
		color: 'white',
		pos: [ 45 , 95 ],
		shape: Shape.rectangle,
	};
	
	collided () {
	
	}
}

Pad.prototype.move = Movement.stop;

export class Pad2 extends Profile {
	static defaults = {
		// size: [ 10, 2 ],
		color: 'green',
		// pos: [ 45 , 95 ],
	};
	collided () {
	
	}
	
	act () {
		console.log(this.entity.x);
	}
}
