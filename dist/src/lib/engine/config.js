export default Object.assign(
	await (await fetch("src/lib/engine/defaultConfigs.json")).json(),
	await (await fetch("config.json")).json()
);
