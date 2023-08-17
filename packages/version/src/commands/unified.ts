import { glob } from "glob";
import cliProgress from "cli-progress";
import fs from "fs-extra";
import chalk from "chalk";
import delay from "../utils/delay";

const unifiedMain = async (version: string, spaces: number) => {
	var a = "123";
	const packageFiles = await glob("**/package.json", { ignore: "node_modules/**" });
	if (packageFiles.length == 0) {
		console.log(chalk.red("not exist package.json in current dir"));
		return;
	}
	const bar = new cliProgress.SingleBar(
		{
			format: "update files [{bar}] {percentage}% | {value}/{total} | file: {speed}",
		},
		cliProgress.Presets.legacy
	);
	bar.start(packageFiles.length, 0, {
		speed: "N/A",
	});
	for (let index = 0; index < packageFiles.length; index++) {
		const file = packageFiles[index];
		bar.update(index, {
			speed: file,
		});
		const packageObj = await fs.readJson(file);
		packageObj.version = version;
		await fs.writeJson(file, packageObj, { spaces: spaces });
		bar.update(index + 1, {
			speed: file,
		});
	}
	bar.stop();
	console.table(
		packageFiles.map((x) => ({
			file: x,
		})),
		["file"]
	);
};

export default unifiedMain;
