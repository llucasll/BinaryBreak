// document.body.style.background = 'black';
// document.body.style.color = 'white';

// Object.assign(document.body.style, {
// 	background: 'black',
// 	color: 'white',
// });

import Native from "./lib/Native.js";
import Entity from "./lib/Entity.js";
import * as turn from './lib/turn.js';
import { Pad, Pad2 } from "./lib/Profile.js";

Native(document.body, {
	style: {
		background: 'black',
		color: 'white',
	}
});

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

const behaviour = {
	"ArrowLeft"  : _ => pad.move(-1),
	"ArrowRight" : _ => pad.move(1),
	' ': _ => console.log('hi!'),
	'g': _ => pad.profile=Pad2,
};

document.onkeydown = function(event) {
	const { key } = event;
	
	behaviour[key]?.();
};

turn.start();
