import Native from "./Native.js";
import * as turn from "./turn.js";

function xy (x, y) {
	return Object.assign([ x, y ], { x, y });
}
function wh (w, h) {
	return Object.assign([ w, h ], { w, h });
}

export default class Entity {
	static board;
	static font;
	static textColor = 'white';
	
	static mediaPrefix = 'media/';
	static mediaSuffix = '.png';
	
	#internal = {
		speed: {
			x: null,
			y: null,
		},
	};
	get internal () { return this.#internal }
	
	/* POSITION */
	
	get x () { return this.pos.x }
	set x (value) { this.pos = [ value, undefined ] }
	get y () { return this.pos.y }
	set y (value) { this.pos = [ undefined, value ] }
	
	set pos ([ x=this.pos.x, y=this.pos.y ]) {
		const die = this.removeOnOutside && (
			x > 100
			|| y > 100
			|| x+this.w < 0
			|| y+this.h < 0
		);
		if (die)
			this.die();
		
		this.element.style.left = x + '%';
		this.element.style.top = y + '%';
	}
	
	get pos () {
		return xy(
			parseFloat(this.element.style.left),
			parseFloat(this.element.style.top),
		);
		
		// const { left, top } = this.element.style;
		//
		// return [
		// 	parseFloat(left),
		// 	parseFloat(top),
		// ];
	}
	move (dx=0, dy=0) {
		const [ x, y ] = this.pos;
		this.pos = [ x+dx, y+dy ];
	}
	
	/* SIZE */
	
	get w () { return this.size.w }
	set w (value) { this.size = [ value, undefined ] }
	get h () { return this.size.h }
	set h (value) { this.size = [ undefined, value ] }
	
	set size ([ w=this.size.w, h=this.size.h ]) {
		this.element.style.width = w + '%';
		this.element.style.height = h + '%';
	}
	
	get size () {
		return wh(
			parseFloat(this.element.style.width),
			parseFloat(this.element.style.height),
		);
	}
	
	/* SPEED */
	
	set speed ([ x, y ]) {
		const old = this.internal.speed;
		
		this.internal.speed.x = x ?? old.x;
		this.internal.speed.y = y ?? old.y;
		
		if (x || y)
			turn.moving.push(this);
		else
			turn.moving.splice(turn.moving.indexOf(this), 1);
	}
	get speed () {
		return this.internal.speed;
	}
	
	/* CONTENT */
	
	set text (value) { this.element.innerText = value }
	get text () { return this.element.innerText }
	
	set color (value) { this.element.style.backgroundColor = value }
	get color () { return this.element.style.backgroundColor }
	
	set image (value) {
		this.element.style.backgroundImage = 'url('
			+ Entity.mediaPrefix
			+ value
			+ Entity.mediaSuffix
		+ ')';
	}
	get image () { return this.element.style.backgroundImage }
	
	board;
	element;
	removeOnOutside = true;
	
	set profile (Profile) { this.#internal.profile = new Profile(this) }
	get profile () { return this.#internal.profile }
	
	constructor (Profile, board=Entity.board) {
		this.board = board;
		
		this.element = Native('div', {
			style: {
				position: 'absolute',
				
				left: '0%',
				top: '0%',
				
				fontFamily: Entity.font,
				color: Entity.textColor,
				// textAlign: 'center',
				// verticalAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				
				backgroundSize: 'cover',
				
				borderRadius: '20px',
			},
		});
		
		turn.registered.push(this);
		
		board.append(this.element);
		
		this.profile = Profile;
	}
	
	die () {
		turn.registered.splice(turn.registered.indexOf(this), 1);
		turn.moving.splice(turn.moving.indexOf(this), 1);
		this.element.parentNode.removeChild(this.element);
	}
}
