/**
 * A Entity's soul
 * @see Entity
 */
export default class Profile {
	/**
	 * Entity's value, when linked with this Profile
	 */
	static defaults = {};
	
	#entity;
	get entity () { return this.#entity }
	
	constructor (entity) {
		this.#entity = entity;
		
		Object.assign(entity, this.constructor.defaults);
	}
}
