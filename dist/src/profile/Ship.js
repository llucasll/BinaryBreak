import Profile from "../lib/engine/Profile.js";
import Entity from "../lib/engine/Entity.js";

class Ship extends Profile {
	static defaults = {
		size: [ 10, 10 ],
		image: 'ship',
		speed: [ -7 ],
	};
}
class Bullet extends Profile {
	static defaults = {
		size: [ 5, 5 ],
		image: 'bullet',
		speed: [ 0, -7 ],
	};
}

const ship = new Entity(Ship);
// ship.text = "I'm a ship";
ship.pos = [ 50, 50 ];
// ship.speed = [ -7 ];

function invert () {
	const timeout = Math.random() * 1000;
	
	ship.speed = [ -ship.speed.x ];
	//ship.vx *= -1;
	
	const bullet = new Entity(Bullet);
	bullet.y = ship.y;
	bullet.x = ship.x + ship.w/2;
	
	setTimeout(invert, 2000 + timeout);
}

invert();
