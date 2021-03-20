import Profile from "../lib/Profile.js";
import Entity from "../lib/Entity.js";
import Shape from "../lib/Shape.js";

export class Brick extends Profile {
	static insertBrick (x, y, profile=Brick) {
		const brick = new Entity(profile);
		const size = {
			x: (Brick.qtd.max.x - Brick.qtd.margin*Brick.qtd.x)/Brick.qtd.x,
			y: (Brick.qtd.max.y - Brick.qtd.margin*Brick.qtd.x)/Brick.qtd.y,
		}
		
		brick.pos = [ size.x * x + Brick.qtd.margin*x, size.y * y + Brick.qtd.margin*y ];
		brick.size = [ size.x, size.y ];
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
		shape: Shape.rectangle,
	};
	
	collided (collider) {
		// console.log("brick collided with", collider);
		this.entity.die();
	}
}
