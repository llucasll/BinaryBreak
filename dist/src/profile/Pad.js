import Profile from "../lib/engine/Profile.js";

import Shape from "../lib/engine/Shape.js";
import { Wall } from "./Wall.js";

export class Pad extends Profile {
	static shape = Shape.rectangle;
	
	static defaults = {
		size: [ 10, 2 ],
		color: 'white',
		opacity: 100,
	};
	colliders = {
		[ Wall.symbol ] () {
			this.entity.stopMovement();
		},
	}
	
	die () {
		this.transform(Pad, true);
		return false;
	}
}

export class InvisiblePad extends Pad {
	static defaults = {
		color: 'grey',
	};
	//objects.ball.colliders.remove(Pad); // TODO
}
