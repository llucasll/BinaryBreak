const Shape = {
	rectangle: Symbol('Shape.square'),
	circle: Symbol('Shape.circle'),
};

export default Shape;

function Point ([ x, y ]) {
	return { x, y };
}

function Rectangle (entity) {
	return [
		Point([ entity.x, entity.y ]),
		Point([ entity.x, entity.y + entity.h ]),
		Point([ entity.x + entity.w, entity.y ]),
		Point([ entity.x + entity.w, entity.y + entity.h ]),
	];
}

class Circle {
	constructor (entity) {
		this.x = entity.x + entity.w/2;
		this.y = entity.y + entity.h/2;
		this.radius = entity.w/2;
	}
}

function distance (x0, y0, x1, y1) {
	const dx = x0 - x1;
	const dy = y0 - y1;
	return Math.sqrt(dx ** 2 + dy ** 2);
}

function pointInsideRectangle (p, rect) {
	return p.x > rect[0].x && p.y > rect[0].y
		&& p.x < rect[1].x && p.y < rect[1].y;
}

export const collided = {
	[Shape.rectangle]: {
		[Shape.rectangle] (self, testing) {
			const rect2 = Rectangle(testing);
			const rect1 = Rectangle(self);
			
			for (const p of rect2) {
				if (pointInsideRectangle(p, [ rect1[0], rect1[3] ]))
					return true;
			}
			
			return false;
		},
	},
	[Shape.circle]: {
		[Shape.circle] (self, testing) {
			const a = new Circle(self);
			const b = new Circle(testing);
			
			return a.radius + b.radius < distance(a.x, a.y, b.x, b.y);
		},
		[Shape.rectangle] (self, testing) {
			// TODO
		},
	},
};

// collided[Shape.circle][Shape.square](a, b)
// a.shape = Shape.circle

// ProfileA.shape = Shape.circle
// collided[a.shape][b.shape](a, b)
