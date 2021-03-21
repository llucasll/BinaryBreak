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
	if (globalThis.debug) {
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