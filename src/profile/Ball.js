import { Movement } from "../lib/Movement.js";
import Profile from "../lib/Profile.js";
import Shape from "../lib/Shape.js";

export class Ball extends Profile {
	static defaults = {
		size: [ 10, 10 ],
		pos: [ 45, 45 ],
		image: 'ball',
		speed: [ 20, 10 ],
		shape: Shape.rectangle,
	};
	
	collided (collider) {
		// console.log("ball collided with", collider);
		
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
}

Ball.prototype.move = Movement.bounce;
