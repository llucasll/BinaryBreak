export const toArray = x => Array.isArray(x)? x : [ x ];

// export const isPositive = x => 1 / x === 1 / Math.abs(x);
// export const isPositive = x => Object.is(1/x, 1/Math.abs(x));
// export const isPositive = x => 1 / x === 1 / Math.abs(x) && x === Math.abs(x);
export const isPositive = x => Object.is(x, Math.abs(x));
export const signal = x => isPositive(x)? 1 : -1;
