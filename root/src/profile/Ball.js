import Profile from "../lib/engine/Profile.js";

import { Movement } from "../lib/engine/Movement.js";
import Shape from "../lib/engine/Shape.js";

import { SolidBrick } from "./Brick.js";
import { Pad } from "./Pad.js";

export class Ball extends Profile {
	static defaults = {
		size: [ 10, 10 ],
		pos: [ 45, 45 ],
		image: 'ball',
		speed: [ 20, 10 ],
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
		[ SolidBrick.symbol ]: collider => {
			this.revert(collider);
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
		this.entity.die();
		console.log("Ball is died");
	}
}

Ball.prototype.move = Movement.bounceOrFall;
