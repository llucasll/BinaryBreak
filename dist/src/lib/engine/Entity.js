import Native from "../Native.js";
import { atMost, healthyInterval, removeFromArray } from "../utils.js";

import * as turn from "./engine.js";
import { getFps } from "./engine.js";
import config from "./config.js";
import { hypotenuse, wh, xy } from "../geometry.js";

/**
 * A engine's object body.
 * A Object visible in the screen handled by the engine.
 */
export default class Entity {
	/* DEFAULTS */
	
	static board;
	
	static all = [];
	
	static buildElement () {
		return Native('div', {
			props: {
				className: 'entity',
			},
			style: {
				fontFamily: config.entity.font,
				fontSize: config.entity.textSize,
				color: config.entity.textColor,
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
		acceleration: {
			x: null,
			y: null,
			maxX: null,
			maxY: null,
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
		if (!this.immortal) {
			const outside = (
				x > 100 // right
				|| y > 100 // bottom
				|| x + this.w < 0 // left
				|| y + this.h < 0 // top
			);
			
			if (outside)
				return this.die();
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
			this.element.clientWidth / this.element.parentElement.clientWidth * 100,
			this.element.clientHeight / this.element.parentElement.clientHeight * 100,
		);
	}
	
	get center () {
		return xy(
			this.x + this.w/2,
			this.y + this.h/2
		);
	}
	set center ([ x, y, w=this.size.w, h=this.size.h ]) {
		if (x === null)
			x = this.center.x;
		if (y === null)
			y = this.center.y;
		
		this.pos = [
			x - w/2,
			y - h/2,
		];
	}
	/**
	 * @param {Entity} compared another Entity to test
	 * @return relative position of collider from this
	 */
	relativePosition (compared) {
		return xy(
			compared.center.x - this.center.x,
			compared.center.y - this.center.y
		);
	}
	
	/**
	 * @return the smallest distance to guarantee that this object is not colliding with the given one
	 */
	minimalDistance (collider) {
		const x = this.w/2 + collider.w/2;
		const y = this.h/2 + collider.h/2;
		
		return {
			x,
			y,
			abs: hypotenuse(x, y),
		};
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
			removeFromArray(turn.moving, this);
	}
	get speed () {
		return { ...this.internal.speed };
	}
	
	/* ACCELERATION */
	
	set acceleration ([ x, y, maxX, maxY ]) {
		const old = this.internal.acceleration;
		
		this.internal.acceleration.x = x ?? old.x;
		this.internal.acceleration.y = y ?? old.y;
		this.internal.acceleration.maxX = maxX ?? old.maxX;
		this.internal.acceleration.maxY = maxY ?? old.maxY;
		
		if (x || y) {
			if (!turn.accelerating.includes(this))
				turn.accelerating.push(this);
		}
		else {
			removeFromArray(turn.moving, this);
		}
	}
	get acceleration () {
		return this.internal.acceleration;
	}
	/**
	 * Changes the speed (relatively).
	 */
	accelerate ([ dx=0, dy=0 ], [ maxX=Infinity, maxY=Infinity ]) {
		const { x, y } = this.speed;
		
		const effective = [
			atMost(x + dx, maxX, x),
			atMost(y + dy, maxY, y),
		];
		
		this.speed = effective;
		
		if (!effective[0] && !effective[1])
			this.acceleration = [ 0, 0, 0, 0 ];
	}
	
	stopMovement () {
		this.speed = [ 0, 0 ];
		this.acceleration = [ 0, 0, 0, 0 ];
	}
	
	/* COLLISION */
	
	ignoreColliders = {
		always: [],
		once: [],
		colliding: [],
	};
	
	/* APPEARANCE */
	
	// TEXT
	set font (value) { this.element.style.fontFamily = value }
	get font () { return this.element.style.fontFamily }
	set textSize (value) { this.element.style.fontSize = value }
	get textSize () { return this.element.style.fontSize }
	set textColor (color) { this.element.style.color = color }
	get textColor () { return this.element.style.color }
	
	set text (value) {
		this.element.innerText = value;
		this.rounded = false;
	}
	get text () { return this.element.innerText }
	
	set color (value) {
		if (!value)
			return;
		
		this.element.style.backgroundColor = value;
		this.element.style.backgroundImage = // TODO
		// 	`radial-gradient(#FFFFFF -150%, ${value} 100%)`;
			`radial-gradient(black -300%, ${value} 50%, white 400%)`;
			// `radial-gradient(${value} 0%, #FFFFFF 300%)`;
	}
	get color () { return this.element.style.backgroundColor }
	
	set image (value) {
		this.element.style.backgroundImage = 'url('
			+ config.media.prefix
			+ value
			+ config.media.suffix
		+ ')';
		
		this.rounded = false;
	}
	get image () { return this.element.style.backgroundImage }
	
	set opacity (value) { this.element.style.opacity = (value/100).toString() }
	get opacity () { return (this.element.style.opacity || 1) * 100 }
	
	set rounded (enable) {
		this.element.style.borderRadius = enable? '20px' : 'unset';
	}
	get rounded () { return this.element.style.borderRadius !== '' }
	
	/**
	 * Make animation effects
	 * TODO use async/await
	 */
	animate (definition, { fps=getFps(), timeout, finishedCallback } = {}) {
		if (!Array.isArray(definition)) {
			const callback = definition;
			return new Promise(resolve => {
				const resolver = (...args) => {
					resolve();
					if (finishedCallback)
						finishedCallback(...args);
				};
				healthyInterval(callback, fps, timeout, resolver, fps);
			});
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
			finishedCallback
		);
	}
	// TODO stop animation
	
	board = Entity.board;
	element = Entity.buildElement();
	
	/**
	 * @see {@link Profile} // TODO not linking
	 */
	updateProfile (Profile) {
		this.#internal.profile?.replacing?.(Profile);
		
		this.#internal.profile = Profile?
			(Profile instanceof Function? new Profile(this): Profile)
			: null;
	}
	set profile (Profile) {
		if (this.#internal.profile?.constructor !== Profile)
			this.updateProfile(Profile);
	}
	get profile () { return this.#internal.profile }
	
	ignoreCollision (obj) {
		const { always, once } = this.ignoreColliders;
		
		if (always.includes(obj))
			return true;
		
		if (once.includes(obj)) {
			removeFromArray(once, obj);
			return true;
		}
		
		return false;
	}
	
	collide (obj) {
		// if (!obj.ignoreCollision(this))
			obj.profile.collided?.(this, this.relativePosition(obj));
		// if (!this.ignoreCollision(obj))
			return this.#internal.profile.collided?.(obj, obj.relativePosition(this));
		
		// return true;
	}
	
	constructor (Profile=null, { profile: profileProps={}, ...defaultProps }={}, board=this.board) {
		this.board = board;
		board.append(this.element);
		
		this.profile = Profile;
		
		Entity.all.push(this);
		
		Object.assign(this, defaultProps);
		if (this.#internal.profile)
			Object.assign(this.#internal.profile, profileProps);
	}
	
	/**
	 * Destroy element.
	 */
	async die () {
		if ((await this.#internal.profile?.die?.()) === false)
			return;
		removeFromArray(Entity.all, this);
		removeFromArray(turn.moving, this);
		try {
			this.element.parentNode.removeChild(this.element);
		}
		catch (e) {
			// debugger; // TODO
		}
	}
	
	async dieSlowly (duration=1, untouchable=true) {
		// TODO this is being scheduled more than one time if it collides twice
		await this.animate(elapsed => {
			this.opacity -= elapsed*100/(duration*1000);
			
			if (this.opacity <= 0) {
				this.die();
				return true;
			}
		});
		
		if (untouchable && this.#internal.profile)
			delete this.#internal.profile.shape;
	}
}
