/* GEOMETRIC ENTITIES */

export function Point ([ x, y ]) {
	return { x, y };
}

export function Rectangle (entity) {
	return [
		Point([ entity.x, entity.y ]),
		Point([ entity.x, entity.y + entity.h ]),
		Point([ entity.x + entity.w, entity.y ]),
		Point([ entity.x + entity.w, entity.y + entity.h ]),
	];
}

export class Circle {
	constructor (entity) {
		this.x = entity.x + entity.w / 2;
		this.y = entity.y + entity.h / 2;
		this.radius = entity.w / 2;
	}
}

/* GEOMETRY FUNCTIONS */

export function hypotenuse (side1, side2) {
	return Math.sqrt(side1 ** 2 + side2 ** 2)
}

export function distance (x0, y0, x1, y1) {
	const dx = x0 - x1;
	const dy = y0 - y1;
	return hypotenuse(dx, dy);
}

export function pointInsideRectangle (p, rect) {
	return p.x > rect[0].x && p.y > rect[0].y
		&& p.x < rect[1].x && p.y < rect[1].y;
}

export function convertTriangle (original, proportions) {
	const proportion = hypotenuse(original.x, original.y) / hypotenuse(proportions.x, proportions.y);
	
	return xy(
		proportions.x * proportion,
		proportions.y * proportion
	);
}

/* UTILITY FUNCTIONS */

export function xy (x, y) {
	return Object.assign([ x, y ], { x, y });
}

export function wh (w, h) {
	return Object.assign([ w, h ], { w, h });
}
