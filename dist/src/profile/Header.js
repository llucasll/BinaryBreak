import Profile from "../lib/engine/Profile.js";
import { getActualFps } from "../lib/engine/engine.js";
import config from "../lib/engine/config.js";

export const headerHeight = config.bricks.area.dy - config.bricks.margin;

export class Title extends Profile {
	static defaults = {
		// immortal: true,
		image: 'title.v3',
		size: [ 45, config.bricks.area.dy - config.bricks.margin ],
		// pos: [ 0, -10 ],
		// center: [ 50 ],
		center: [ 50, headerHeight / 2 ],
	};
}

export class Fps extends Profile {
	static decimalPlaces = 2;
	static prefix = 'FPS: ';
	
	static defaults = {
		text: Fps.prefix + '00.00',
		center: [ 50, headerHeight / 2 ],
		textSize: '1em',
		textColor: 'gray',
	};
	
	act () {
		const [ integer, decimal ] = getActualFps().toString().split('.');
		this.entity.text =
			Fps.prefix
			+ integer
			+ '.'
			+ (decimal?.slice(0, Fps.decimalPlaces) || '').padEnd(Fps.decimalPlaces, '0');
	}
}

export class LivesIcon extends Profile {
	static defaults = {
		size: [ 6, 6 ],
		image: config.sprites.balls.red,
		pos: [ 3 ],
		center: [ null, headerHeight / 2 ],
	};
}

export class LivesCount extends Profile {
	static defaults = {
		text: 'x0',
		pos: [ 11 ],
		center: [ null, headerHeight / 2 ],
	};
}

export class Score extends Profile {
	static defaults = {
		text: ''.padStart(config.scoreLength, '0'),
		pos: [ 86 ],
		center: [ null, headerHeight / 2 ],
	};
}

export class End extends Profile {
	static defaults = {
		textSize: '10vmin',
	};
}
