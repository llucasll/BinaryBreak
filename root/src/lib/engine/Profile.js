/**
 * A Entity's soul, that defines it's behaviour and appearance,
 * and can be changed dynamically
 * @see Entity
 */

import { classChain, prototypeChain } from "../utils.js";
import { Movement } from "./Movement.js";
import { convertTriangle } from "../geometry.js";

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
	
	#entity;
	get entity () { return this.#entity }
	
	// #shape;
	// get shape () { return this.#shape ?? this.constructor.shape }
	// set shape (shape) { return this.#shape }
	shape = this.constructor.shape;
	
	/**
	 * Default collision handlers (a empty mapper)
	 */
	colliders = {};
	
	constructor (entity) {
		this.#entity = entity;
		
		// for (let constructor of [ ...classChain(this) ].reverse())
		const constructors = [ ...classChain(this) ];
		for (let i=constructors.length-1; i>=0; i--)
			Object.assign(entity, constructors[i].defaults);
	}
	
	/**
	 * Default collision behaviour
	 * @param {Entity} collider entity that had collided with this.
	 * @param relativePos relative position of collider from this
	 */
	collided (collider, relativePos) {
		for (let proto of prototypeChain(this)) {
			for (let colliderClass of classChain(collider.profile)) {
				const collisionHandler = proto.colliders?.[colliderClass.symbol];
				if (collisionHandler)
					return collisionHandler.call(this, collider, relativePos);
			}
		}
		
		return; // no handler
	}
	
	transform (Profile) {
		this.entity.profile = Profile;
	}
	
	runCollision (collision, collider, ...args) {
		return this.colliders[collision]?.call(this, collider, ...args);
	}
	
	updateSpeedAngle (angle) {
		this.entity.speed = convertTriangle(this.entity.speed, angle);
	}
}

Profile.prototype.move = Movement.die;
