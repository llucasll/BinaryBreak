import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import { InvisiblePad, Pad, Pad2 } from "./Pad.js";
import Shape from "../lib/engine/Shape.js";
import { rand } from "../lib/utils.js";

export default class Item extends Profile {
	static shape = Shape.rectangle;
	
	static defaults = {
		color: '',
		size: [ 8, 8 ],
		speed: [ 0, 20 ],
	};
	
	constructor (entity) {
		super(entity);
		objects.items.push(this);
	}
	
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
			collider.profile.transform(Pad2);
		},
		[ InvisiblePad.symbol ]: collider => {
			this.entity.die();
			collider.profile.transform(Pad);
		},
	};
	
	die () {
		data.score++;
	}
}

export class Life extends Item {
	static defaults = {
		image: 'floppy',
	};
	
	colliders = {
		[ Pad.symbol ]: collider => {
			this.entity.die();
			data.lives++;
		},
	};
}

export class UnknownElement extends Item {
	static defaults = {
		text: '?',
		textColor: 'yellow',
	};
	
	colliders = {
		[ Pad.symbol ]: collider => {
			this.entity.die();
			balls.profile.transform(rand( [ 'BlueBall' ] ));
		},
	};
}

Item.all = [ Life ];

Item.prototype.move = Movement.die;
