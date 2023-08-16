import { glob, globSync, globStream, globStreamSync, Glob } from "glob";
import cliProgress from "cli-progress";
import fs from "fs-extra";
const unifiedMain = async (version: string, spaces: number) => {
	const packageFiles = await glob("**/package.json", { ignore: "node_modules/**" });
	if (packageFiles.length == 0) {
		console.log("not exist package.json in current dir");
		return;
	}
	// create a new progress bar instance and use shades_classic theme
	// const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	// bar.start(packageFiles.length, 0);
	for (let index = 0; index < packageFiles.length; index++) {
		const file = packageFiles[index];
		const packageObj = await fs.readJson(file);
		console.log(file);
		console.log(packageObj.version);
		packageObj.version = version;
		await fs.writeJson(file, packageObj, { spaces: spaces });
		// bar.update(index);
	}
	// bar.stop();
};

export default unifiedMain;
