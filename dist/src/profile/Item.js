import Profile from "../lib/engine/Profile.js";

import { InvisiblePad, Pad } from "./Pad.js";
import Shape from "../lib/engine/Shape.js";
import { rand, removeFromArray } from "../lib/utils.js";
import objects from "../gameObjects.js";
import { BlueBall } from "./Ball.js";
import { FireBall } from "./Ball.js";
import { BottomWall, Shield } from "./Wall.js";
import Entity from "../lib/engine/Entity.js";

import data from "../data.js";

export default class Item extends Profile {
	static shape = Shape.rectangle;
	
	static defaults = {
		// rounded: false, // TODO create functionality?
		size: [ 8, 8 ],
		speed: [ 0, 20 ],
	};
	
	constructor (entity) {
		super(entity);
		objects.items.push(this.entity);
	}
	
	colliders = {
		[ Pad.symbol ] () {
			this.action();
			this.entity.die();
		},
		[ BottomWall.symbol ] () {
			this.entity.die();
		},
	};
	
	die () {
		removeFromArray(objects.items, this.entity);
	}
}

export class ZeroItem extends Item {
	static defaults = {
		text: '0',
		textColor: 'white',
	};
	
	action () {
		objects.pad.profile.transform(InvisiblePad);
	}
}

export class OneItem extends Item {
	static defaults = {
		text: '1',
		textColor: 'dodgerblue',
	};
	
	colliders = {
		...this.colliders,
		
		[ InvisiblePad.symbol ] (collider) {
			this.entity.die();
			collider.profile.transform(Pad);
		},
	};
	
	action () {
		data.score++;
	}
}

export class LifeItem extends Item {
	static defaults = {
		image: 'items/floppy',
	};
	
	action () {
		data.lives++;
	}
}

export class UnknownItem extends Item {
	static defaults = {
		text: '?',
		textColor: 'yellow',
	};
	
	action () {
		objects.balls[0].profile.transform(rand([ FireBall, BlueBall]));
	}
}

export class ShieldItem extends Item {
	static defaults = {
		image: 'items/firewall1',
	};
	
	action () {
		if (!objects.shield)
			objects.shield = new Entity(Shield);
	}
}

Item.all = [ LifeItem, UnknownItem, ShieldItem ];
