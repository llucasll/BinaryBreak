import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import Shape from "../lib/engine/Shape.js";

import { Brick } from "./Brick.js";
import { InvisiblePad, Pad } from "./Pad.js";
import objects from "../gameObjects.js";

export class Ball extends Profile {
	static defaults = {
		size: [ 8, 8 ],
		pos: [ 45, 80 ],
		image: 'ball',
		shape: Shape.rectangle,
	};
	
	colliders = {
		revert (collider) {
			this.revert(collider);
		},
		[ Pad.symbol ]: collider => {
			this.runCollision('revert', collider);
			//this.runCollision.revert(collider); // TODO
		},
		[ InvisiblePad.symbol ]: collider => {
			//this.runCollision(Pad.symbol, collider);
			//this.runCollision[Pad.symbol](collider); // TODO
		},
		[ Brick.symbol ]: collider => {
			// healthyInterval(
			// 	(function* () {
			// 		const profiles = [a, b, b];
			// 		for (const profile of profiles) {
			// 			yield this.transform(profile);
			// 		}
			// 	})()
			// );
			
			// function* gen (profiles) {
			// 	for (const profile of profiles) {
			// 		yield this.transform(profile);
			// 	}
			// }
			//
			// const iterator = gen(["a", "b", "c"]);
			// const result = [...iterator];
			this.runCollision('revert', collider);
		},
	};
	
	init (pad = objects.pad) {
		pad.profile.transform(Pad);
		this.entity.pos = [ pad.x + pad.w/2 - this.entity.w/2, pad.y - this.entity.h ];
		this.entity.speed = [ 0, 0 ];
		pad.stalker = this.entity;
	}
	
	revert (collider) {
		const { x, y } = this.entity.speed;
		
		const top = {
			self: this.entity.y,
			collider: collider.y,
		};
		const bottom = {
			self: this.entity.y + this.entity.h,
			collider: collider.y + collider.h,
		};
		
		const revert = (y<0 && top.self > top.collider)
			|| (y>0 && bottom.self < bottom.collider)
		
		if (revert) {
			this.entity.speed = [ x, -y ];
		}
	}
	
	die () {
		console.log("Ball is died");
		
		data.lives--;
		this.init();
		
		return false;
	}
}

Ball.prototype.move = Movement.bounceOrFall;
