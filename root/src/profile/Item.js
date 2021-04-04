import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import { InvisiblePad, Pad, Pad2 } from "./Pad.js";
import Shape from "../lib/engine/Shape.js";

export default class Item extends Profile {
	static defaults = {
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

export class Zero extends Item {
	static defaults = {
		text: '0',
		textColor: 'white',
	};
	
	colliders = {
		[ Pad.symbol ]: collider => {
			this.entity.die();
			collider.profile.transform(InvisiblePad);
		},
	};
}

export class One extends Item {
	static defaults = {
		text: '1',
		textColor: 'dodgerblue',
	};
	
	colliders = {
		[ Pad.symbol ]: collider => {
			this.entity.die();
			if (collider.profile instanceof InvisiblePad)
				collider.profile.transform(Pad);
			else if (collider.profile instanceof Pad)
				collider.profile.transform(Pad2);
			},
	};
}

Item.prototype.move = Movement.die;