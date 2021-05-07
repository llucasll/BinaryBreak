import Entity from "../lib/engine/Entity.js";
import Profile from "../lib/engine/Profile.js";

import Shape from "../lib/engine/Shape.js";

import { Ball, BlueBall } from "./Ball.js";
import data from "../data.js";
import Item, { OneItem, ZeroItem } from "./Item.js";
import { rand, toArray } from "../lib/utils.js";
import config from "../lib/engine/config.js";
import objects from "../gameObjects.js";

export class Brick extends Profile {
	static insertBrick (x, y, profile=Brick) {
		const brick = new Entity(profile);
		
		const size = {
			x: (Brick.area.x - Brick.margin*(Brick.amount.x + 2))/Brick.amount.x,
			y: (Brick.area.y - Brick.margin*(Brick.amount.y + 2))/Brick.amount.y,
		};
		
		brick.pos = [
			size.x * x + Brick.margin*x + Brick.margin*1.5,
			size.y * y + Brick.margin*y + Brick.area.dy,
		];
		brick.size = [ size.x, size.y ];
		
		brick.profile.x = x;
		brick.profile.y = y;
		data.bricks++;
		
		return brick;
	}
	
	static shape = Shape.rectangle;
	
	static defaults = {
		color: 'white',
	};
	
	colliders = {
		async [ Ball.symbol ] (collider) {
			await this.action();
			
			if (collider.profile instanceof BlueBall)
				data.score++;
		}
	};
	
	async action () {
		const bit = [ ZeroItem, OneItem, null, null ];
		await this.spawnAndDieSlowly(bit);
	}
	
	spawn (items) {
		const constructor = rand(toArray(items)); // TODO see usages, recursively..
		if (!constructor)
			return;
		
		const item = new Entity(constructor);
		item.x = this.entity.x + this.entity.w/2 - item.w/2;
		item.y = this.entity.y;
	}
	async spawnAndDieSlowly (items) {
		this.spawn(items);
		await this.entity.dieSlowly();
	}
	
	replacing (next) {
		data.score++;
	}
	
	async die () {
		data.score++;
		data.bricks--;
		delete objects.bricks[this.y][this.x];
	}
}

Object.assign(Brick, config.bricks);

export class SolidBrick extends Brick {
	static defaults = {
		color: 'lightgreen',
		shape: Shape.rectangle,
	};
	
	action () {
		this.transform(Brick);
	}
}

export class HardBrick extends SolidBrick {
	static defaults = {
		color: 'green',
		shape: Shape.rectangle,
	};
	
	action () {
		this.transform(SolidBrick);
	}
}

export class SpecialBrick extends SolidBrick {
	static defaults = {
		color: 'purple',
		shape: Shape.rectangle,
	};
	
	async action () {
		await this.spawnAndDieSlowly(Item.rand());
	}
}

Brick.all = [ SpecialBrick ];
