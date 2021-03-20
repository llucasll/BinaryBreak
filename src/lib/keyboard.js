export function setKeyboardListener (behaviour) {
	// document.addEventListener('keydown', event => {
	// 	const { key } = event;
	// 	behaviour[key]?.();
	// });
	document.onkeydown = event => {
		const { key } = event;
		behaviour[key]?.();
	};
}
