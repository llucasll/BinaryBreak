export function setKeyboardListener (behaviour) {
	document.addEventListener('onkeydown', event => {
		const { key } = event;
		behaviour[key]?.();
	});
}
