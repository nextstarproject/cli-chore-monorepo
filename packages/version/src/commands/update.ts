import { glob } from "glob";
import cliProgress from "cli-progress";
import fs from "fs-extra";
import chalk from "chalk";
import delay from "../utils/delay";
import semver from "semver";
import { ReleaseType } from "../consts/releaseType";

type updateVersion = {
	file: string;
	old?: string | null;
	new?: string | null;
};

const updateMain = async (workspaces: string[], increment: ReleaseType, spaces: number) => {
	const newWorkspaces = workspaces.map((x) => `${x}/package.json`);
	const packageFiles = await glob(newWorkspaces, { ignore: "node_modules/**" });
	if (packageFiles.length == 0) {
		console.log(chalk.red("not exist package.json in current dir"));
		return;
	}
	const list: updateVersion[] = [];
	// create a new progress bar instance and use shades_classic theme
	console.log(chalk.blue("update package.json files: "));
	const bar = new cliProgress.SingleBar(
		{
			format: "update [{bar}] {percentage}% | {value}/{total} | file: {speed}",
		},
		cliProgress.Presets.legacy
	);
	bar.start(packageFiles.length, 0, {
		speed: "N/A",
	});
	for (let index = 0; index < packageFiles.length; index++) {
		const file = packageFiles[index];
		const temp: updateVersion = {
			file: file,
		};
		bar.update(index, {
			speed: file,
		});
		const packageObj = await fs.readJson(file);

		if (packageObj.version == undefined || packageObj.version == null) {
			temp.old = null;
			temp.new = "1.0.0";
			packageObj.version = "1.0.0";
		} else {
			temp.old = packageObj.version;
			const validResult = semver.valid(packageObj.version);
			if (validResult == null || validResult == undefined) {
				packageObj.version = "1.0.0";
				temp.new = "1.0.0";
			} else {
				const newVersion = semver.inc(validResult, increment);
				packageObj.version = newVersion;
				temp.new = newVersion;
			}
		}
		await fs.writeJson(file, packageObj, { spaces: spaces });
		list.push(temp);
		bar.update(index + 1, {
			speed: file,
		});
	}
	bar.stop();
	console.log(chalk.green(`finish package.json update version count: ${packageFiles.length}`));
	console.table(list, ["file", "old", "new"]);
};

export default updateMain;
