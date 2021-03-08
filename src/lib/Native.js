import { toArray } from "./utils.js";

export default function Native (target, { style, props, on={}, children=[], parent }={}) {
	if (typeof target == "string")
		target = document.createElement(target);
	
	Object.assign(target, props);
	Object.assign(target.style, style);
	
	Object.entries(on)
		.forEach(
			([ eventName, listener ]) => target.addEventListener(eventName, listener)
		);
	target.append(...toArray(children));
	
	parent?.appendChild(target);
	
	return target;
}
