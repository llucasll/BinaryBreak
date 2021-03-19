const Shape = {
	square: Symbol('Shape.square'),
	circle: Symbol('Shape.circle'),
};

export default Shape;

export const collided = {
	[Shape.square]: {
		[Shape.square] (self, testing) {
		
		},
	},
	[Shape.circle]: {
		[Shape.circle] (self, testing) {
		
		},
		[Shape.square] (self, testing) {
		
		},
	},
};
