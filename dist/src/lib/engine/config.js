import { asyncTryExpression } from "../utils.js";

const project = await asyncTryExpression(async _ => await (await fetch("config.json")).json(), {});
const { engineLocation = "src/lib/" } = project;

const engine = await (await fetch(engineLocation + "engine/configs.json")).json();

const development = await asyncTryExpression(async _ => await (await fetch("config.development.json")).json(), {});

export default Object.assign(
	engine,
	project,
	development.testProduction ? {} : development,
);
