import { asyncTryExpression, deepMerge } from "../utils.js";

const project = await asyncTryExpression(async _ => await (await fetch("config.json")).json(), {});
const { engineLocation = "src/lib/" } = project;

const engine = await (await fetch(engineLocation + "engine/configs.json")).json();
const developmentDefaults = await (await fetch(engineLocation + "engine/config.development.json")).json();

const localDevelopment = await asyncTryExpression(async _ => await (await fetch("config.development.json")).json(), {});

// const development = {
// 	...developmentDefaults,
// 	...localDevelopment,
// };
//
// export default { // TODO make it recursive
// 	...engine,
// 	...project,
// 	...development.development.enable? development : {},
// };

const development = deepMerge(
	developmentDefaults,
	localDevelopment,
);

export default deepMerge(
	engine,
	project,
	development.development.enable? development : {},
);
