import { glob } from "glob";
import cliProgress from "cli-progress";
import fs from "fs-extra";
import chalk from "chalk";

const unifiedMain = async (version: string, spaces: number) => {
	const packageFiles = await glob("**/package.json", { ignore: "node_modules/**" });
	if (packageFiles.length == 0) {
		console.log("not exist package.json in current dir");
		return;
	}
	// create a new progress bar instance and use shades_classic theme
	console.log(chalk.blue("update package.json files: "));
	const bar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);
	bar.start(packageFiles.length, 0);
	for (let index = 0; index < packageFiles.length; index++) {
		const file = packageFiles[index];
		const packageObj = await fs.readJson(file);
		packageObj.version = version;
		await fs.writeJson(file, packageObj, { spaces: spaces });
		bar.increment();
	}
	bar.stop();
	console.log(chalk.green(`finish package.json update version count: ${packageFiles.length}`));
};

export default unifiedMain;
