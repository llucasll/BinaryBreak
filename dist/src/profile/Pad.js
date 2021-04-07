import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import Shape from "../lib/engine/Shape.js";
import { Wall } from "./Wall.js";

export class Pad extends Profile {
	static shape = Shape.rectangle;
	static move = Movement.stop;
	
	static defaults = {
		size: [ 10, 2 ],
		color: 'white',
	};
	colliders = {
		[ Wall.symbol ]: _ => {
			this.entity.stopMovement();
		},
	}
}

export class Pad2 extends Pad {
	static defaults = {
		// size: [ 10, 2 ],
		color: 'green',
		// pos: [ 45 , 95 ],
	};
	
	act () {
		// console.log(this.entity.x);
	}
}

export class InvisiblePad extends Pad {
	static defaults = {
		color: 'grey',
	};
	//objects.ball.colliders.remove(Pad);
}
