// document.body.style.background = 'black';
// document.body.style.color = 'white';

// Object.assign(document.body.style, {
// 	background: 'black',
// 	color: 'white',
// });

import Native from "./lib/Native.js";
import Entity from "./lib/Entity.js";
import * as turn from './lib/turn.js';
import { Ball, Brick, Pad, Pad2 } from "./lib/Profile.js";

Native(document.body, {
	style: {
		background: 'black',
		color: 'white',
	}
});
document.title = 'Binary Break';

// Native('p', {
// 	parent: document.body,
// 	children: "Olá, mundo!",
// 	on: {
// 		click () {
// 			this.innerText = "click";
// 		},
// 		mouseover () {
// 			this.innerText = "over";
// 		},
// 		mouseout () {
// 			this.innerText = "out";
// 		},
// 	}
// });

// Native('div', {
// 	parent: document.body,
// 	style: {
// 		border: '1px solid blue',
// 		width: '80vmin',
// 		height: '80vmin',
// 	},
// 	children: Native('p', {
// 		children: "Olá, mundo!",
// 		on: {
// 			click () {
// 				this.innerText = "click";
// 			},
// 			mouseover () {
// 				this.innerText = "over";
// 			},
// 			mouseout () {
// 				this.innerText = "out";
// 				setTimeout(_ => this.innerText = "Olá mundo!", 1000)
// 			},
// 		}
// 	})
// });

Entity.board = Native('div', {
	parent: document.body,
	style: {
		width: '80vmin',
		height: '80vmin',
		
		position: 'relative',
		
		border: '1px solid blue',
	},
});

// const x = new GameObject();
// x.pos = [ 50, 50 ];
// x.vel = [ 1, 1 ];

// const x = new GameObject({
// 	// text: 'abc',
// 	image: 'ball',
// 	// color: 'blue',
// 	size: [ 50, 50 ],
// 	pos: [ 50, 50 ],
// 	vel: [ 5, 1 ],
// });

const pad = new Entity(Pad);
const ball = new Entity(Ball);

const qtd = {
	x: 10,
	y: 4,
	
	max: {
		x: 100,
		y: 20,
	},
	
	margin: 1,
};

function insertBrick (x, y, profile=Brick) {
	const brick = new Entity(profile);
	const size = {
		x: (qtd.max.x - qtd.margin*qtd.x)/qtd.x,
		y: (qtd.max.y - qtd.margin*qtd.x)/qtd.y,
	}
	debugger
	
	brick.pos = [ size.x * x + qtd.margin*x, size.y * y + qtd.margin*y ];
	brick.size = [ size.x, size.y ];
}

for (let j=0; j<qtd.y; j++) {
	for (let i=0; i<qtd.x; i++) {
		insertBrick(i, j);
	}
}

// const nave = new Entity();
// nave.text = "Eu sou uma nave";
// nave.pos = [ 50, 50 ];
// nave.speed = [ -10 ];
//
// function invert () {
// 	const timeout = Math.random()*1000;
// 	nave.speed = [ -nave.speed.x ];
// 	nave.vx *= -1;
// 	setInterval(invert, timeout);
// }
//
// invert();

const behaviour = {
	ArrowLeft: _ => pad.move(-1),
	ArrowRight: _ => pad.move(1),
	' ': _ => console.log('hi!'),
	g: _ => pad.profile = Pad2,
	w: _ => pad.profile = Pad,
	x: _ => ball.profile = Pad,
};

document.onkeydown = function(event) {
	const { key } = event;
	
	behaviour[key]?.();
};

turn.start();
