import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import Shape from "../lib/engine/Shape.js";

export class Pad extends Profile {
	static defaults = {
		size: [ 10, 2 ],
		color: 'white',
		pos: [ 45 , 95 ],
		shape: Shape.rectangle,
	};
}

Pad.prototype.move = Movement.stop;

export class Pad2 extends Profile {
	static defaults = {
		// size: [ 10, 2 ],
		color: 'green',
		// pos: [ 45 , 95 ],
	};
	
	act () {
		console.log(this.entity.x);
	}
}

export class InvisiblePad extends Pad {
	static defaults = {
		color: 'grey',
	};
	collided (collider) {
	}
	//objects.ball.colliders.remove(Pad);
}
