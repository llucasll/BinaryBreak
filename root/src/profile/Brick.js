import Entity from "../lib/engine/Entity.js";
import Profile from "../lib/engine/Profile.js";

import Shape from "../lib/engine/Shape.js";

import { Ball } from "./Ball.js";
import data from "../data.js";
import { One, Zero } from "./Item.js";
import { rand } from "../lib/utils.js";

export class Brick extends Profile {
	static bricksArea = {
		dy: 10,
		x: 100,
		y: 20,
	};
	static amount = {
		x: 10,
		y: 4,
	};
	static margin = 1;
	
	static insertBrick (x, y, profile=Brick) {
		const brick = new Entity(profile);
		
		const size = {
			x: (Brick.bricksArea.x - Brick.margin*Brick.amount.x)/Brick.amount.x,
			y: (Brick.bricksArea.y - Brick.margin*(Brick.amount.y+2))/Brick.amount.y,
		};
		
		brick.pos = [
			size.x * x + Brick.margin*x + Brick.margin,
			size.y * y + Brick.margin*y + Brick.bricksArea.dy,
		];
		brick.size = [ size.x, size.y ];
		
		return brick;
	}
	
	static defaults = {
		color: 'white',
		shape: Shape.rectangle, // TODO it's Profile's attribute
	};
	
	colliders = {
		[ Ball.symbol ]: collider => {
			this.entity.dieSlowly();
		}
	};
	
	replacing (next) {
		data.score++;
	}
	
	die () {
		data.score++;
	}
}

export class SolidBrick extends Brick {
	static defaults = {
		color: 'lightgreen',
		shape: Shape.rectangle,
	};
	collided (collider) {
		this.entity.profile = Brick;
	}
}

export class HardBrick extends SolidBrick {
	static defaults = {
		color: 'green',
		shape: Shape.rectangle,
	};
	collided (collider) {
		this.entity.profile = SolidBrick;
	}
}

export class SpecialBrick extends SolidBrick {
	static defaults = {
		color: 'purple',
		shape: Shape.rectangle,
	};
	collided (collider) {
		this.entity.dieSlowly();
		
		const item = new Entity(rand([ Zero, One ]));
		item.x = this.entity.x + this.entity.w/2 - item.w/2;
		item.y = this.entity.y;
	}
}
