import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import { Pad } from "./Pad.js";
import Shape from "../lib/engine/Shape.js";

export default class Item extends Profile {
	static defaults = {
		image: 'bullet',
		color: '',
		size: [ 8, 8 ],
		shape: Shape.rectangle,
		speed: [ 0, 20 ],
	};
	
	colliders = {
		[ Pad.symbol ]: collider => {
			this.entity.die();
		},
	};
}

Item.prototype.move = Movement.die;
