import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import Shape from "../lib/engine/Shape.js";

import { Brick } from "./Brick.js";
import { InvisiblePad, Pad } from "./Pad.js";
import objects from "../gameObjects.js";

export class Ball extends Profile {
	static shape = Shape.rectangle;
	
	static defaults = {
		size: [ 8, 8 ],
		pos: [ 45, 80 ],
		image: 'ball',
	};
	
	colliders = {
		// revert (collider, angle) {
		// 	this.revert(collider, angle);
		// },
		[ Pad.symbol ]: (collider, angle) => {
			// this.runCollision('revert', collider, angle);
			
			this.updateSpeedAngle(angle);
			
			//this.runCollision.revert(collider); // TODO
		},
		[ InvisiblePad.symbol ]: collider => {
			//this.runCollision(Pad.symbol, collider);
			//this.runCollision[Pad.symbol](collider); // TODO
		},
		[ Brick.symbol ]: (collider, angle) => {
			// this.runCollision('revert', collider, angle);
			
			this.updateSpeedAngle(angle);
			
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
		},
	};
	
	init (pad = objects.pad) {
		pad.profile.transform(Pad);
		this.entity.pos = [ pad.x + pad.w/2 - this.entity.w/2, pad.y - this.entity.h ];
		// this.entity.speed = [ 0, 0 ];
		this.entity.speed = [ 7, 0 ];
		pad.stalker = this.entity;
	}
	
	// revert (collider, angle) {
	// 	const { x, y } = this.entity.speed;
	//
	// 	const top = {
	// 		self: this.entity.y,
	// 		collider: collider.y,
	// 	};
	// 	const bottom = {
	// 		self: this.entity.y + this.entity.h,
	// 		collider: collider.y + collider.h,
	// 	};
	//
	// 	const revert = (y<0 && top.self > top.collider)
	// 		|| (y>0 && bottom.self < bottom.collider);
	//
	// 	if (revert) {
	// 		this.entity.speed = convertTriangle({ x, y }, angle);
	// 	}
	// }
	
	act () {
		const before = this.entity.center.x < objects.pad.x && (this.entity.speed.x < 0);
		const after = this.entity.center.x > (objects.pad.x + objects.pad.w) && (this.entity.speed.x > 0);
		if (objects.pad.stalker === this.entity && (before || after))
			this.entity.speed = [ - this.entity.speed.x ];
	}
	
	die () {
		console.log("Ball has died/is dead");
		
		data.lives--;
		this.init();
		
		return false;
	}
}

Ball.prototype.move = Movement.bounceOrFall;
