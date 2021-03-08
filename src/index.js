// document.body.style.background = 'black';
// document.body.style.color = 'white';

// Object.assign(document.body.style, {
// 	background: 'black',
// 	color: 'white',
// });

import Native from "./lib/Native.js";
import GameObject from "./lib/GameObject.js";
import * as turn from './lib/turn.js';

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

GameObject.board = Native('div', {
	parent: document.body,
	style: {
		width: '80vmin',
		height: '80vmin',
		
		position: 'relative',
		
		border: '1px solid blue',
	},
});

const x = new GameObject();
x.setPos(50, 50);
x.setVel(-1);
turn.start();
