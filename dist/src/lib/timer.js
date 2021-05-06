import { getProducer, toArray } from "./utils.js";

/**
 * Measures duration of the given callback
 * @param callback
 * @return {Promise<number>} elapsed time in milliseconds
 */
export async function timed (callback) {
	const dtime = chronometer();
	await callback();
	return dtime();
}

/**
 * @param ms
 * @return {Promise<void>} a Promise which resolves in the given milliseconds
 */
export function sleep (ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function* chronometerGenerator () {
	const start = Date.now();
	
	while (true)
		yield Date.now() - start;
}

/**
 * @return {(function(): number)} a initialized timer which returns the elapsed time since initialization
 */
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

/**
 * @return {(function(): number)} a timer which returns the elapsed time since the last call
 */
export function stepChronometer () {
	return getProducer(stepChronometerGenerator);
}

export async function* intervalGenerator (ms, timeout = Infinity) {
	const dtime = chronometer();
	
	while (dtime() < timeout) {
		yield await timed(_ => sleep(ms));
	}
}

/**
 * A lightweight version of setInterval, using setTimeout and re-scheduling // TODO
 * @param callback to be ran periodically
 * @param interval in milliseconds
 * @param timeout optionally define a time limit (in milliseconds)
 * @param finishedCallback optional function to be executed after timeout
 * @param args optional arguments to callback
 */
export async function softInterval (callback, interval, timeout = Infinity, finishedCallback, ...args) {
	for await (const elapsed of intervalGenerator(interval, timeout)) {
		const result = await callback(...args);
		
		if (result) {
			if (typeof finishedCallback == "function")
				finishedCallback(...toArray(result), ...args);
			break;
		}
	}
}
