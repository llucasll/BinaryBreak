import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import Shape from "../lib/engine/Shape.js";

import { Brick } from "./Brick.js";
import { InvisiblePad, Pad } from "./Pad.js";
import objects from "../gameObjects.js";
import config from "../lib/engine/config.js";
import { BottomWall, HorizontalWall, VerticalWall } from "./Wall.js";

export class Ball extends Profile {
	static shape = Shape.rectangle;
	static move = Movement.bounceOrFall;
	
	static defaults = {
		size: [ 8, 8 ],
		image: config.sprites.balls.red,
	};
	
	colliders = {
		[ HorizontalWall.symbol ]: (collider, angle) => {
			const { x, y } = this.entity.speed;
			this.entity.speed = [ x, -y ];
			
			this.entity.ignoreCollision.colliding.push(collider);
		},
		[ VerticalWall.symbol ]: (collider, angle) => {
			const { x, y } = this.entity.speed;
			
			this.entity.speed = [ -x, y ];
			this.entity.ignoreCollision.colliding.push(collider);
		},
		[ BottomWall.symbol ]: (collider, angle) => { // TODO replace this function with null
		
		},
		[ Pad.symbol ]: (collider, angle) => {
			// this.runCollision('revert', collider, angle);
			//this.runCollision.revert(collider); // TODO
			
			this.updateSpeedAngle(angle);
		},
		[ InvisiblePad.symbol ]: collider => { // TODO replace this function with null
			//this.runCollision(Pad.symbol, collider);
			//this.runCollision[Pad.symbol](collider); // TODO
		},
		[ Brick.symbol ]: (collider, angle) => {
			// this.updateSpeedAngle(angle);
			
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
		
		if (this.constructor !== Ball)
			this.transform(Ball);
		
		this.entity.pos = [ pad.x + pad.w/2 - this.entity.w/2, pad.y - this.entity.h ];
		this.entity.speed = [ 7, 0 ];
		
		pad.stalker = this.entity;
	}
	
	// revertVertical (collider) {
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
	// 	const revert = (y<0 && top.self < bottom.collider)
	// 		|| (y>0 && bottom.self > top.collider);
	//
	// 	if (revert) {
	// 		this.entity.speed = [ x, -y ];
	// 	}
	// }
	//
	// revertHorizontal (collider) {
	// 	const { x, y } = this.entity.speed;
	//
	// 	const left = {
	// 		self: this.entity.x,
	// 		collider: collider.x,
	// 	};
	// 	const right = {
	// 		self: this.entity.x + this.entity.w,
	// 		collider: collider.x + collider.w,
	// 	};
	//
	// 	const revert = (x<0 && left.self < right.collider)
	// 		|| (x>0 && right.self > left.collider);
	// 	debugger
	//
	// 	if (revert) {
	// 		this.entity.speed = [ -x, y ];
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

export class BlueBall extends Ball {
	static defaults = {
		image: config.sprites.balls.blue,
	}
}