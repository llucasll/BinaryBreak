import Profile from "../lib/engine/Profile.js";
import Shape from "../lib/engine/Shape.js";

export class Wall extends Profile {
	static shape = Shape.rectangle;
	
	static defaults = {
		color: 'blue',
	};
}

export class DivWall extends Wall {

}
