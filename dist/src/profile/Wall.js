import Profile from "../lib/engine/Profile.js";
import Shape from "../lib/engine/Shape.js";
import config from "../lib/engine/config.js";

export class Wall extends Profile {
	static shape = Shape.rectangle;
	
	static defaults = {
		color: 'blue',
	};
}

export class VerticalWall extends Wall {
	static defaults = {
		size: [ config.size.wall, 100 ],
	};
}

export class HorizontalWall extends Wall {
	static defaults = {
		size: [ 100, config.size.wall ],
	};
}

export class BottomWall extends HorizontalWall {}
