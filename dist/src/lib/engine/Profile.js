/**
 * A Entity's soul, that defines it's behaviour and appearance,
 * and can be changed dynamically
 * @see Entity
 */

import { classChain, rand, toArray } from "../utils.js";
import { convertTriangle, xy } from "../geometry.js";

export default class Profile {
	/**
	 * Entity's value, when linked with this Profile
	 */
	static defaults = {};
	
	static #symbols = new WeakMap();
	/**
	 * Class identity.
	 * To be used, for example, when determining collision behaviours.
	 */
	static get symbol () {
		return Profile.#symbols.get(this)
			?? Profile.#symbols.set(this, Symbol(this.name)).get(this);
	}
	
	static rand () {
		return rand(this.all);
	}
	
	#entity;
	get entity () { return this.#entity }
	
	// #shape;
	// get shape () { return this.#shape ?? this.constructor.shape }
	// set shape (shape) { return this.#shape }
	shape = this.constructor.shape;
	move = this.constructor.move;
	
	/**
	 * Default collision handlers (a empty mapper)
	 */
	colliders = {};
	/**
	 * Collision handlers
	 */
	// colliders = [ ...prototypeChain(this) ]
	// 	.reduce((previous, current) => {
	// 		return Object.assign(previous, current.colliders)
	// 	}, {});
	
	constructor (entity) {
		this.#entity = entity;
		
		// for (let constructor of [ ...classChain(this) ].reverse())
		const constructors = [ ...classChain(this) ]; // TODO classChain returning duplicated entries
		for (let i=constructors.length-1; i>=0; i--)
			Object.assign(entity, constructors[i].defaults);
	}
	
	/**
	 * Default collision behaviour
	 * @param {Entity} collider entity that had collided with this.
	 * @param relativePos relative position of collider from this
	 */
	async collided (collider, relativePos) {
		for (let colliderClass of classChain(collider.profile)) {
			// if (colliderClass.name === "BottomWall")
			// 	debugger;
			const collisionHandler = this.colliders[colliderClass.symbol];
			if (collisionHandler)
				return await collisionHandler.call(this, collider, relativePos);
			if (collisionHandler === null)
				return true;
		}
		
		return true; // no handler
	}
	
	uncollide (collider, speed) {
		const requiredDistance = this.entity.minimalDistance(collider);
		const relativePosition = this.entity.relativePosition(collider);
		
		const actualDistance = {
			x: Math.abs(relativePosition.x),
			y: Math.abs(relativePosition.y),
		};
		
		const back = {
			x: requiredDistance.x - actualDistance.x,
			y: requiredDistance.y - actualDistance.y,
		};
		
		const axis = {
			main: back.x < back.y? 'x' : 'y',
			cross: back.x < back.y? 'y' : 'x',
		};
		
		this.entity[axis.main] -= Math.sign(speed[axis.main]) * back[axis.main];
		this.entity[axis.cross] -= Math.sign(speed[axis.cross]) * back[axis.main]/actualDistance[axis.main];
		// if (back.x < back.y) {
		// 	this.entity.x -= Math.sign(speed.x) * back.x;
		// 	this.entity.y -= Math.sign(speed.y) * back.x/actualDistance.x;
		// }
		// else {
		// 	this.entity.y -= Math.sign(y) * back.y;
		// 	this.entity.x -= Math.sign(x) * back.y/actualDistance.y;
		// }
	}
	
	bounce (collider, axis) {
		const { [axis]: speed } = this.entity.speed;
		
		const { x, y } = this.entity.speed;
		this.entity.speed = [
			x * (axis==='x'? -1 : 1),
			y * (axis==='y'? -1 : 1),
		];
		
		const { [axis]: requiredDistance } = this.entity.minimalDistance(collider);
		const { [axis]: relativePosition } = this.entity.relativePosition(collider);
		
		const actualDistance = Math.abs(relativePosition);
		const back = requiredDistance - actualDistance;
		
		this.entity[axis] -= Math.sign(speed) * back;
	}
	
	transform (Profile, force=false) {
		const center = this.entity.center;
		
		force?
			this.entity.updateProfile(Profile)
			: this.entity.profile = Profile;
		
		this.entity.center = center;
	}
	
	runCollision (collision, collider, ...args) {
		return this.colliders[collision]?.call(this, collider, ...args);
	}
	
	updateSpeedAngle (angle, speed) {
		const current = speed? xy(toArray(speed)) : this.entity.speed;
		this.entity.speed = convertTriangle(current, angle);
	}
}
