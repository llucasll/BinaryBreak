/**
 * A Entity's soul, that defines it's behaviour and appearance,
 * and can be changed dynamically
 * @see Entity
 */
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
	
	/**
	 * Default collision handlers (a empty mapper)
	 */
	colliders = {};
	
	constructor (entity) {
		this.#entity = entity;
		
		Object.assign(entity, this.constructor.defaults);
	}
	
	/**
	 * Default collision behaviour
	 * @param {Entity} collider entity that had collided with this.
	 */
	collided (collider) {
		for (let c=collider.profile.constructor; c!==Function.prototype; c=Object.getPrototypeOf(c)) {
			const collisionHandler = this.colliders[c.symbol];
			if (collisionHandler)
				return collisionHandler.call(this, collider);
		}
		
		return; // no handler
	}
	
	runCollision (collision, collider) {
		return this.colliders[collision]?.call(this, collider);
	}
}
