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

export async function timed (callback) {
	const dtime = chronometer();
	await callback();
	return dtime();
}

export function sleep (ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function getProducer (generator) {
	const iterator = generator();
	iterator.next();
	return _ => iterator.next().value;
}

function* chronometerGenerator () {
	const start = Date.now();
	
	while (true)
		yield Date.now() - start;
}

export function chronometer () {
	return getProducer(chronometerGenerator);
}

function* nowGenerator () {
	let last;
	while (true) {
		yield last = Date.now();
	}
}
function* stepChronometerGenerator () {
	let last = 0;
	
	for (const now of nowGenerator()) {
		yield now - last;
		last = now;
	}
}

// function* stepChronometerGenerator () {
// 	let last = Date.now();
// 	let current = Date.now();
//
// 	while (true) {
// 		// const elapsed = Date.now() - last;
// 		// last = Date.now();
// 		// yield elapsed;
//
// 		yield current - last;
// 		([ last, current ] = [ current, Date.now() ]);
// 	}
// }

export function stepChronometer () {
	return getProducer(stepChronometerGenerator);
}

export async function* intervalGenerator (ms, timeout=Infinity) {
	const dtime = chronometer();
	
	while (dtime() < timeout) {
		yield await timed(_ => sleep(ms));
	}
}

/**
 * A lightweight version of setInterval, using setTimeout and re-scheduling
 * @param callback to be ran periodically
 * @param interval in milliseconds
 * @param timeout optionally define a time limit (in milliseconds)
 * @param finishedCallback optional function to be executed after timeout
 * @param args optional arguments to callback
 */
export async function softInterval (callback, interval, timeout=Infinity, finishedCallback, ...args) {
	for await (const elapsed of intervalGenerator(interval, timeout)) {
		const result = await callback(...args);
		
		if (result) {
			if (typeof finishedCallback == "function")
				finishedCallback(...toArray(result), ...args);
			break;
		}
	}
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
