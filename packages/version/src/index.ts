#!/usr/bin/env node

import { program } from "commander";
import unifiedMain from "./commands/unified";
import semver from "semver";
import chalk from "chalk";

program.name("ns-version").description("CLI unified Update version").version("1.0.0");

program
	.command("unified")
	.alias("u")
	.description("Unified update version, default ignore node_modules")
	.argument("<version>", "target version")
	.option("-s, --spaces <number>", "number of spaces to indent", "2")
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
	.description("target package update version")
	.option("-p, --path <path...>", "target package workspace")
	.action((str, options) => {
		console.log(str);
		console.log(String(options));
		if (options?.path != undefined) {
			const workspace = options.path as string[];
		}
	});

program.parse();
