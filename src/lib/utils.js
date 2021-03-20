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

export const rand = array => array[Math.floor(Math.random() * array.length)];

