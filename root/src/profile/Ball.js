import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import Shape from "../lib/engine/Shape.js";

import { Brick, SolidBrick } from "./Brick.js";
import { Pad } from "./Pad.js";
import data from "../data.js";
import objects from "../gameObjects.js";

export class Ball extends Profile {
	static defaults = {
		size: [ 8, 8 ],
		pos: [ 45, 80 ],
		image: 'ball',
		//speed: [ 50, -25 ],
		shape: Shape.rectangle,
	};
	
	colliders = {
		[ Pad.symbol ]: collider => {
			this.revert(collider);

			this.entity.animate([ 'ship', 'bullet' ], {
				fps: 5,
				timeout: 2,
				timeoutCallback: _ => {
					this.entity.image = 'ball';
					console.log("Ball animation ended!");
				}
			});
		},
		[ Brick.symbol ]: collider => {
			data.score++;
		},
		[ SolidBrick.symbol ]: collider => {
			this.revert(collider);
			data.score++;
		},
	};
	
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
		
		const pad = objects.pad;
		this.entity.pos = [ pad.x + pad.w/2 - this.entity.w/2, pad.y - this.entity.h ];
		this.entity.speed = [ 0, 0 ];
		pad.stalker = this.entity;
		
		return false;
	}
}

Ball.prototype.move = Movement.bounceOrFall;
