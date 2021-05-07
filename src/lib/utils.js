/**
 * Returns x if it's an array. Returns an array only with x, otherwise.
 * @param x
 */
export const toArray = x => Array.isArray(x)? x : [ x ];

// export const isPositive = x => 1 / x === 1 / Math.abs(x);
// export const isPositive = x => Object.is(1/x, 1/Math.abs(x));
// export const isPositive = x => 1 / x === 1 / Math.abs(x) && x === Math.abs(x);
export const isPositive = x => Object.is(x, Math.abs(x));
export const signal = x => isPositive(x)? 1 : -1;

export function debug () {
	if (globalThis.debug) { // TODO config.development?.debug (?)
		debugger;
	}
}

export function removeFromArray (arr, elem) {
	const index = arr.indexOf(elem);
	if (index !== -1)
		arr.splice(index, 1);
}

/**
 * A lightweight version of setInterval, using setTimeout and re-scheduling
 * @param callback to be ran periodically
 * @param interval in milliseconds
 * @param timeout optionally define a time limit (in milliseconds)
 * @param timeoutCallback optional function to be executed after timeout
 * @param args optional arguments to callback
 */
export function healthyInterval (callback, interval, timeout, timeoutCallback, ...args) {
	let timeoutID;
	
	function action () {
		if (!callback(...args))
			timeoutID = setTimeout(action, interval);
	}
	
	setTimeout(action, interval);
	
	if (timeout)
		setTimeout(
			_ => {
				clearTimeout(timeoutID);
				if (typeof timeoutCallback == "function")
					timeoutCallback();
			},
			timeout
		);
}

/**
 * @param array
 * @return an random element of the array
 */
export const rand = array => array[Math.floor(Math.random() * array.length)];

export const atMost = (proposed, limit, old) =>
	Math.abs(limit) >= Math.abs(old)?
		keepInRange(proposed, -Math.abs(limit), Math.abs(limit))
		: (old<-Math.abs(limit)? Math.min(proposed, -Math.abs(limit)) : Math.max(proposed, Math.abs(limit)));

export const keepInRange = (proposed, min=-Infinity, max=Infinity) =>
	Math.max(Math.min(proposed, max), min);

// export function outsideRange (old, proposed, min, max) {
// 	if (proposed < min || proposed > max)
// 		return proposed;
//
// 	if (old < proposed)
// 		return min;
//
// 	return max;
// }
export function outsideRange (old, proposed, min, max) {
	if (old < proposed) {
		if (old > max)
			return proposed;
		
		return keepInRange(proposed, -Infinity, min);
	}
	
	if (old < min)
		return proposed;
	return keepInRange(proposed, max, Infinity);
}
window.outsideRange = outsideRange;

export function* prototypeChain (obj) { // TODO
	yield obj;
	for (let proto=Object.getPrototypeOf(obj); proto != null; proto = Object.getPrototypeOf(proto))
		yield proto;
}

export function* classChain (obj) { // TODO classChain returning duplicated entries
	for (let proto of prototypeChain(obj))
		yield proto.constructor;
}

export function tryExpression (f, fallback) {
	try {
		return f();
	}
	catch (e) {
		return fallback;
	}
}

export async function asyncTryExpression (f, fallback) {
	try {
		return await f();
	}
	catch (e) {
		return fallback;
	}
}

export const noop = _ => _;

export const isObject = item => item && typeof item === 'object' && !Array.isArray(item);

/**
 * Performs a deep merge of objects and returns new object.
 * Does not modify objects (immutable)
 * Does not merges arrays (they are replaced).
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function deepMerge (...objects) {
	const isObject = obj => obj && typeof obj === 'object';
	
	return objects.reduce((acc, obj) => {
		if (obj) {
			Object.keys(obj).forEach(key => {
				const aVal = acc[key];
				const oVal = obj[key];
				
				acc[key] = (isObject(aVal) && isObject(oVal))?
					deepMerge(aVal, oVal)
					: oVal;
			});
		}
		
		return acc;
	}, {});
}

export function relativeURLBuilder (base) {
	return relative => new URL(relative, base).toString();
}

export function selectiveAssign (dest, source, keys) {
	for (const key of toArray(keys)) {
		dest[key] = source[key];
	}
}
