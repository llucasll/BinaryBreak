import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import { Pad } from "./Pad.js";
import Shape from "../lib/engine/Shape.js";

export class SpecialItem extends Profile {
	static defaults = {
		image: 'bullet',
		shape: Shape.rectangle,
		speed: [ 0, 20 ],
	};
	
	colliders = {
		[ Pad.symbol ]: collider => {
				this.entity.die();
			},
	};
}

SpecialItem.prototype.move = Movement.die;
