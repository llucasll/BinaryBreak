export function setKeydownListener (behaviour) {
	// document.addEventListener('keydown', event => {
	// 	const { key } = event;
	// 	behaviour[key]?.();
	// });
	document.onkeydown = event => {
		const { key } = event;
		behaviour[key]?.();
	};
}

export function setKeyupListener (behaviour) {
	document.onkeyup = event => {
		const { key } = event;
		behaviour[key]?.();
	};
}
