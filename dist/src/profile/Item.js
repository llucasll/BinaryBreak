import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import { InvisiblePad, Pad, Pad2 } from "./Pad.js";
import Shape from "../lib/engine/Shape.js";
import { rand, removeFromArray } from "../lib/utils.js";
import objects from "../gameObjects.js";
import { BlueBall } from "./Ball.js";
import { BottomWall } from "./Wall.js";

export default class Item extends Profile {
	static shape = Shape.rectangle;
	static move = Movement.die;
	
	static defaults = {
		color: '',
		// rounded: false,
		size: [ 8, 8 ],
		speed: [ 0, 20 ],
	};
	
	constructor (entity) {
		super(entity);
		objects.items.push(this.entity);
	}
	
	colliders = {
		[ Pad.symbol ]: _ => {
			this.entity.die();
		},
		[ BottomWall.symbol ]: _ => {
			this.entity.die();
		},
	};
	
	die () {
		removeFromArray(objects.items, this.entity);
	}
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
		[ Pad.symbol ]: _ => {
			this.entity.die();
			data.lives++;
		},
	};
}

export class UnknownItem extends Item {
	static defaults = {
		text: '?',
		textColor: 'yellow',
	};
	
	colliders = {
		[ Pad.symbol ]: _ => {
			this.entity.die();
			objects.balls[0].profile.transform(rand([ BlueBall ]));
		},
	};
}

Item.all = [ Life, UnknownItem ];
