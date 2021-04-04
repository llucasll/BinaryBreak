import { Circle, distance, pointInsideRectangle, Rectangle } from "../geometry.js";

const Shape = {
	rectangle: Symbol('Shape.square'),
	circle: Symbol('Shape.circle'),
};

export default Shape;

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

export function testCollision (a, b) {
	return collided[a.profile?.shape]?.[b.profile?.shape]?.(a, b)
		|| collided[b.profile?.shape]?.[a.profile?.shape]?.(b, a);
}
