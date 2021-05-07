import { Circle, distance, pointInsideRectangle, Rectangle } from "../geometry.js";

const Shape = {
	rectangle: Symbol('Shape.square'),
	circle: Symbol('Shape.circle'),
};

export default Shape;

export const collided = {
	[Shape.rectangle]: {
		[Shape.rectangle] (self, testing) {
			return self.x < testing.x + testing.w &&
				self.x + self.w > testing.x &&
				self.y < testing.y + testing.h &&
				self.y + self.h > testing.y;
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
