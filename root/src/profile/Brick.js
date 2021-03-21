import Profile from "../lib/Profile.js";
import Entity from "../lib/Entity.js";
import Shape from "../lib/Shape.js";
import { Ball } from "./Ball.js";

export class Brick extends Profile {
	static insertBrick (x, y, profile=Brick) {
		const brick = new Entity(profile);
		const size = {
			x: (Brick.qtd.max.x - Brick.qtd.margin*Brick.qtd.x)/Brick.qtd.x,
			y: (Brick.qtd.max.y - Brick.qtd.margin*Brick.qtd.x)/Brick.qtd.y,
		}
		
		brick.pos = [ size.x * x + Brick.qtd.margin*x, size.y * y + Brick.qtd.margin*y ];
		brick.size = [ size.x, size.y ];
		
		return brick;
	}
	
	static qtd = {
		x: 10,
		y: 4,
		
		max: {
			x: 100,
			y: 20,
		},
		
		margin: 1,
	};
	
	static defaults = {
		// image: 'ball',
		// color: 'green',
		color: 'white',
		shape: Shape.rectangle, // TODO it's Profile's attribute
	};
	
	// static colliders = _ => ({
	// 	[ Ball.symbol ] (collider) {
	// 		// console.log("brick collided with", collider);
	// 		this.entity.dieSlowly();
	// 	}
	// });
	
	colliders = {
		[ Ball.symbol ] (collider) {
			// console.log("brick collided with", collider);
			this.entity.dieSlowly();
		}
	};
}

export class Brick2 extends Brick {
	static defaults = {
		color: 'lightgreen',
		shape: Shape.rectangle,
	};
	collided (collider) {
		this.entity.profile = Brick;
	}
}

export class Brick3 extends Brick {
	static defaults = {
		color: 'green',
		shape: Shape.rectangle,
	};
	collided (collider) {
		this.entity.profile = Brick2;
	}
}
