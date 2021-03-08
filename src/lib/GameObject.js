import Native from "./Native.js";
import * as turn from "./turn.js";

function xy (x, y) {
	return Object.assign([ x, y ], { x, y });
}
function wh (w, h) {
	return Object.assign([ w, h ], { w, h });
}
function getXY (Arguments, Default) {
	return {
		x: Arguments[0].x ?? Default.x,
		y: Arguments[0].y ?? Default.y,
	}
}

export default class GameObject {
	static board;
	static font;
	static textColor = 'white';
	
	static mediaPrefix = 'media/';
	static mediaSuffix = '.png';
	
	#internal = {};
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
		
		// Native(this.element, {
		// 	style: {
		// 		left: x + "%",
		// 		top: y + "%",
		// 	}
		// });
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
		
		// Native(this.element, {
		// 	style: {
		// 		left: x + "%",
		// 		top: y + "%",
		// 	}
		// });
	}
	
	get size () {
		return wh(
			parseFloat(this.element.style.width),
			parseFloat(this.element.style.height),
		);
		
		// const { left, top } = this.element.style;
		//
		// return [
		// 	parseFloat(left),
		// 	parseFloat(top),
		// ];
	}
	
	/* SPEED */
	
	get vx () { return this.vel.x }
	set vx (value) { this.vel = [ value, undefined ] }
	get vy () { return this.vel.y }
	set vy (value) { this.vel = [ undefined, value ] }
	
	set vel ([ vx=this.vx, vy=this.vy ]) {
		this.internal.vx = vx;
		this.internal.vy = vy;
		
		if (vx || vy)
			turn.moving.push(this);
		else
			turn.moving.splice(turn.moving.indexOf(this), 1);
	}
	get vel () {
		const { vx, vy } = this.internal;
		return xy(vx, vy);
	}
	
	/* CONTENT */
	
	set text (value) { this.element.innerText = value }
	get text () { return this.element.innerText }
	
	set color (value) { this.element.style.backgroundColor = value }
	get color () { return this.element.style.backgroundColor }
	
	set image (value) {
		this.element.style.backgroundImage =
			'url('
			+ GameObject.mediaPrefix
			+ value
			+ GameObject.mediaSuffix
			+ ')';
	}
	get image () { return this.element.style.backgroundImage }
	
	board;
	element;
	removeOnOutside = true;
	
	constructor (props={}, board=GameObject.board) {
		this.board = board;
		
		this.element = Native('div', {
			style: {
				position: 'absolute',
				
				left: '0%',
				top: '0%',
				
				fontFamily: GameObject.font,
				color: GameObject.textColor,
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
		
		Object.assign(this, props);
	}
	
	die () {
		turn.registered.splice(turn.registered.indexOf(this), 1);
		turn.moving.splice(turn.moving.indexOf(this), 1);
		this.element.parentNode.removeChild(this.element);
	}
}
