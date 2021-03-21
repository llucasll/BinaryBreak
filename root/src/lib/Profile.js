/**
 * A Entity's soul
 * @see Entity
 */
export default class Profile {
	/**
	 * Entity's value, when linked with this Profile
	 */
	static defaults = {};
	// static colliders = _ => ({});
	
	static #symbols = new WeakMap();
	static get symbol () {
		// return this.x ?? (this.x = Symbol(this.name));
		return Profile.#symbols.get(this)
			?? Profile.#symbols.set(this, Symbol(this.name)).get(this);
	}
	
	#entity;
	get entity () { return this.#entity }
	
	// colliders = Object.create(this.constructor.colliders);
	// colliders = this.constructor.colliders();
	colliders = {};
	
	constructor (entity) {
		this.#entity = entity;
		
		Object.assign(entity, this.constructor.defaults);
	}
	
	collided (collider) {
		for (let c=collider.profile.constructor; c!==Function.prototype; c=Object.getPrototypeOf(c)) {
			const collisionHandler = this.colliders[c.symbol];
			if (collisionHandler)
				return collisionHandler.call(this, collider);
		}
		
		return; // no handler
	}
}
