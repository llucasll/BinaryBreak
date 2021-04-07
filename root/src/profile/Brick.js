import Entity from "../lib/engine/Entity.js";
import Profile from "../lib/engine/Profile.js";

import Shape from "../lib/engine/Shape.js";

import { Ball } from "./Ball.js";
import data from "../data.js";
import Item, { One, Zero } from "./Item.js";
import { rand, toArray } from "../lib/utils.js";
import config from "../lib/engine/config.js";

export class Brick extends Profile {
	static insertBrick (x, y, profile=Brick) {
		const brick = new Entity(profile);
		
		const size = {
			x: (Brick.area.x - Brick.margin*Brick.amount.x)/Brick.amount.x,
			y: (Brick.area.y - Brick.margin*(Brick.amount.y+2))/Brick.amount.y,
		};
		
		brick.pos = [
			size.x * x + Brick.margin*x + Brick.margin,
			size.y * y + Brick.margin*y + Brick.area.dy,
		];
		brick.size = [ size.x, size.y ];
		
		return brick;
	}
	
	static shape = Shape.rectangle;
	
	static defaults = {
		color: 'white',
	};
	
	colliders = {
		[ Ball.symbol ]: collider => {
			const bit = [ Zero, One, null, null ];
			this.spawnAndDieSlowly(bit);
		}
	};
	
	spawn (items) {
		const constructor = rand(toArray(items));
		if (!constructor)
			return;
		
		const item = new Entity(constructor);
		item.x = this.entity.x + this.entity.w/2 - item.w/2;
		item.y = this.entity.y;
	}
	spawnAndDieSlowly (items) {
		this.entity.dieSlowly();
		this.spawn(items);
	}
	
	replacing (next) {
		data.score++;
	}
	
	die () {
		data.score++;
		// TODO remove from objects.bricks
	}
}

Object.assign(Brick, config.bricks);

export class SolidBrick extends Brick {
	static defaults = {
		color: 'lightgreen',
		shape: Shape.rectangle,
	};
	
	colliders = {
		[ Ball.symbol ]: collider => {
			this.transform(Brick);
		}
	};
}

export class HardBrick extends SolidBrick {
	static defaults = {
		color: 'green',
		shape: Shape.rectangle,
	};
	
	colliders = {
		[ Ball.symbol ]: collider => {
			this.transform(SolidBrick);
		}
	};
}

export class SpecialBrick extends SolidBrick {
	static defaults = {
		color: 'purple',
		shape: Shape.rectangle,
	};
	
	colliders = {
		[ Ball.symbol ]: collider => {
			this.spawnAndDieSlowly(Item.all);
		}
	};
}
