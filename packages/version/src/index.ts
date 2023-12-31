#!/usr/bin/env node

import { program } from "commander";
import unifiedMain from "./commands/unified";
import semver from "semver";
import chalk from "chalk";
import appInfo from "../package.json";
import { ReleaseType, releaseTypes } from "./consts/releaseType";
import updateMain from "./commands/update";

program.name("ns-version").description("CLI unified Update version");

// 获取版本信息
program.version(appInfo.version, "-v, --version");

program
	.command("unified")
	.alias("u")
	.description("Unified update to the specified version, default ignore node_modules")
	.argument("<version>", "Specifying the version")
	.option("-s, --spaces <number>", "Number of spaces to indent", "2")
	.action(async (str, options) => {
		if (Number.isNaN(options.spaces)) {
			console.error(chalk.red("error: spaces is must number"));
			return;
		}
		const version = semver.valid(str);
		if (version == null || version == undefined) {
			console.error(chalk.red("error: version is must conform to specifications: x.x.x"));
			return;
		}
		const spaces = Number(options.spaces);
		try {
			await unifiedMain(version, spaces);
		} catch (error) {
			console.error(chalk.red(error));
		}
	});

program
	.command("update")
	.alias("up")
	.description("Upgrade the version under the specified workspace")
	.option(
		"-w, --workspace <workspace...>",
		"Target workspace, default: **, Results: [workspace]/package.json, ignore node_modules",
		"**"
	)
	.option(
		"-i, --increment <level>",
		"Increment a version by the specified level.  Level can be one of: major, minor, patch, premajor, preminor, prepatch, or prerelease.  Default level is 'patch'. Only one version may be specified.",
		"patch"
	)
	.option("-s, --spaces <number>", "Number of spaces to indent", "2")
	// 如果不存在argument，则第一个参数为options
	.action(async (options) => {
		let workspaces: string[] = ["**"];
		let increment: ReleaseType = "patch";
		if (options?.workspace != undefined && typeof options?.workspace == "object") {
			const temp = options.workspace as string[];
			if (temp.length > 0) {
				workspaces = temp;
			}
		}

		if (options?.increment != undefined && typeof options?.increment == "string") {
			if (releaseTypes.indexOf(options.increment) >= 0) {
				increment = options.increment as ReleaseType;
			} else {
				console.error(
					chalk.red(
						"error: increment level is must 'major' | 'premajor' | 'minor' | 'preminor' | 'patch' | 'prepatch' | 'prerelease'"
					)
				);
				return;
			}
		}

		if (Number.isNaN(options.spaces)) {
			console.error(chalk.red("error: spaces is must number"));
			return;
		}
		const spaces = Number(options.spaces);

		try {
			await updateMain(workspaces, increment, spaces);
		} catch (error) {
			console.error(chalk.red(error));
		}
	});

program.parse();
