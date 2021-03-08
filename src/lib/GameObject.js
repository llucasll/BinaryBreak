import Native from "./Native.js";
import * as turn from "./turn.js";

export default class GameObject {
	static board;
	
	board;
	element;
	vel=0;
	angle=1;
	
	constructor (board = GameObject.board) {
		this.board = board;
		
		this.element = Native('div', {
			style: {
				position: 'absolute',
				
				left: '0%',
				top: '0%',
			},
			children: Native('p', { children: 'aaaaaaaaaaaaaaaaaaaaaaaaaa' })
		})
		
		board.append(this.element);
	}
	
	setVel (v) {
		this.vel = v;
		
		if (v)
			turn.moving.push(this);
		else
			turn.moving.splice(turn.moving.indexOf(this), 1);
	}
	
	getPos () {
		const { left, top } = this.element.style;
		
		return {
			x: parseFloat(left),
			y: parseFloat(top),
		};
	}
	
	setPos (x, y) {
		Native(this.element, {
			style: {
				left: (x ?? this.getPos().x) + "%",
				top: (y ?? this.getPos().y) + "%",
			}
		});
	}
	
	move (dx=0, dy=0) {
		const { x, y } = this.getPos();
		this.setPos(x+dx, y+dy);
	}
}
