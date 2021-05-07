import { toArray } from "./utils.js";

/**
 * A function that simplifies the HTMLElement manipulation
 * @param target
 * @param style
 * @param props
 * @param on
 * @param children
 * @param parent
 * @return {HTMLElement}
 * @constructor
 */
export default function Native (target, { style, props, on={}, children=[], parent }={}) {
	if (typeof target == "string")
		target = document.createElement(target);
	
	Object.assign(target, props);
	Object.assign(target.style, style);
	
	Object.entries(on)
		.forEach(
			([ eventName, listener ]) => target.addEventListener(eventName, listener)
		);
	
	if (Array.isArray(children))
		target.innerText = '';
	target.append(...toArray(children));
	
	parent?.appendChild(target);
	
	return target;
}

// const htmlElement = Native('h1', {
// 	parent: document.body,
// 	style: {
// 		background: 'blue',
// 	},
// 	props: {
// 		href: 'url...',
// 	},
// 	on: {
// 		keydown: e => console.log(e),
// 	},
// 	children: [
// 		Native(anotherElement, {
// 			//...
// 		})
// 	],
// });
