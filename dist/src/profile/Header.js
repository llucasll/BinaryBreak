import Profile from "../lib/engine/Profile.js";
import { getActualFps } from "../lib/engine/engine.js";
import config from "../lib/engine/config.js";

export default class Header extends Profile {
	static defaults = {
		center: [ 50, (config.bricks.area.dy - config.bricks.margin)/2 ],
	};
}

// export class Title extends Header {
export class Title extends Profile {
	static defaults = {
		// immortal: true,
		image: 'title.v2',
		size: [ 45, config.bricks.area.dy - config.bricks.margin ],
		// pos: [ 0, -10 ],
		// center: [ 50 ],
		center: [ 50, (config.bricks.area.dy - config.bricks.margin)/2 ],
	};
}

export class Fps extends Header {
	static decimalPlaces = 2;
	static prefix = 'FPS: ';
	
	static defaults = {
		text: Fps.prefix + '00.00',
		center: [ 50, (config.bricks.area.dy - config.bricks.margin)/2 ],
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

export class Lives extends Profile {
	static defaults = {
		pos: [ 3 ],
		center: [ null, (config.bricks.area.dy - config.bricks.margin) / 2 - 3 ],
	};
}

export class Score extends Profile {
	static defaults = {
		text: ''.padStart(config.scoreLength, '0'),
		pos: [ 86 ],
		center: [ null, (config.bricks.area.dy - config.bricks.margin) / 2 ],
	};
}
