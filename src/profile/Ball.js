import { Movement } from "../lib/Movement.js";
import Profile from "../lib/Profile.js";

export class Ball extends Profile {
	static defaults = {
		size: [ 10, 10 ],
		pos: [ 45, 45 ],
		image: 'ball',
		speed: [ 20, 10 ],
	};
}

Ball.prototype.move = Movement.bounce;
