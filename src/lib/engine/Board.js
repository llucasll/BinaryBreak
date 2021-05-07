import Entity from "./Entity.js";
import Native from "../Native.js";

export default class Board {
	constructor ({ defaultBoard=true, parent=document.body, background, extra={} }) {
		const element = Native('div', Object.assign(
			{
				parent,
				props: {
					className: 'board', // try remove this!
				},
				style: {
					backgroundImage: background,
				},
			},
			extra
		));
		
		if (defaultBoard)
			Entity.board = element;
	}
}
