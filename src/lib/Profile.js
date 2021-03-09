export default class Profile {
	static defaults = {};
	
	#entity;
	get entity () { return this.#entity }
	
	constructor (entity) {
		this.#entity = entity;
		
		Object.assign(entity, this.constructor.defaults);
	}
}

export class Pad extends Profile {
	static defaults = {
		size: [ 10, 2 ],
		color: 'white',
		pos: [ 45 , 95 ],
	};
}
export class Pad2 extends Profile {
	static defaults = {
		size: [ 10, 2 ],
		color: 'green',
		pos: [ 45 , 95 ],
	};
}
