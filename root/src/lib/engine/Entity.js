import Native from "../Native.js";
import * as turn from "./engine.js";
import { healthyInterval, removeFromArray } from "../utils.js";
import { getFps } from "./engine.js";

function xy (x, y) {
	return Object.assign([ x, y ], { x, y });
}
function wh (w, h) {
	return Object.assign([ w, h ], { w, h });
}

/**
 * A engine's object body.
 * A Object visible in the screen handled by the engine.
 */
export default class Entity {
	/* DEFAULTS */
	
	static board;
	// text font
	static font;
	static textColor = 'white';
	
	static mediaPrefix = 'media/';
	static mediaSuffix = '.png';
	
	static buildElement () {
		return Native('div', {
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
	}
	
	/**
	 * Private internal data
	 */
	#internal = {
		speed: {
			x: null,
			y: null,
		},
	};
	/**
	 * Private data
	 */
	get internal () { return this.#internal }
	
	/* POSITION */
	
	get x () { return this.pos.x }
	set x (value) { this.pos = [ value, undefined ] }
	get y () { return this.pos.y }
	set y (value) { this.pos = [ undefined, value ] }
	
	set pos ([ x=this.pos.x, y=this.pos.y ]) {
		if (this.profile?.move) {
			const result = this.profile.move(x, y);
			
			if (result === false)
				return;
			if (result === null)
				return this.die();
			if (Array.isArray(result))
				([ x, y ] = result);
		}
		
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
	/**
	 * Move object on screen (relative movement).
	 */
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
		
		if (x || y) {
			if (!turn.moving.includes(this))
				turn.moving.push(this);
		}
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
	
	/**
	 * Make animation effects
	 * TODO use async/await
	 */
	animate (definition, { fps=getFps(), timeout, timeoutCallback } = {}) {
		if (!Array.isArray(definition)) {
			const callback = definition;
			healthyInterval(callback, fps, timeout, timeoutCallback, fps);
			return;
		}
		
		const sprites = definition;
		let i = 0;
		
		healthyInterval(
			_ => {
				this.image = sprites[i++];
				i %= sprites.length;
			},
			1000/fps,
			timeout*1000,
			timeoutCallback
		);
	}
	// TODO stop animation
	
	board = Entity.board;
	element = Entity.buildElement();
	
	/**
	 * @see {@link Profile}
	 */
	set profile (Profile) { this.#internal.profile = Profile? new Profile(this) : null }
	get profile () { return this.#internal.profile }
	
	constructor (Profile=null, board=this.board) {
		this.board = board;
		board.append(this.element);
		
		this.profile = Profile;
		
		turn.entities.push(this);
	}
	
	/**
	 * Destroy element.
	 */
	die () {
		removeFromArray(turn.entities, this);
		removeFromArray(turn.moving, this);
		try {
			this.element.parentNode.removeChild(this.element);
		}
		catch (e) {
			debugger; // TODO
		}
	}
	
	dieSlowly (duration=1) {
		// TODO this is being scheduled more than one time if it collides twice
		this.animate(elapsed => {
			const oldOpacity = this.element.style.opacity || 1; // TODO
			this.element.style.opacity = oldOpacity - elapsed/(duration*1000);
			
			if (this.element.style.opacity <= 0) {
				this.die();
				return true;
			}
		});
	}
}