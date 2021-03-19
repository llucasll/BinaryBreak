export default class Shape {
	get x () { return this.entity.x; }
	get y () { return this.entity.y; }
	get w () { return this.entity.w; }
	get h () { return this.entity.h; }
	
	constructor (entity) {
		this.entity = entity;
	}
	
	collided (testing) {
	// function collided ({ shape: a }, { shape: b }) {
		return this[testing.constructor]?.(testing) || testing[this.constructor]?.(this);
	}
}

// export function P (x, y) {
// 	return { x, y };
// }

export class Square extends Shape {
	// constructor (p1, p2) {
	// 	super();
	//
	// 	this.p1 = p1;
	// 	this.p2 = p2;
	// }
	
	[Square] () {
	
	}
}
