export default class Profile {
	static defaults = {};
	
	#entity;
	get entity () { return this.#entity }
	
	constructor (entity) {
		this.#entity = entity;
		
		Object.assign(entity, this.constructor.defaults);
	}
}
