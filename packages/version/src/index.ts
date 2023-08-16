#!/usr/bin/env node

import { program } from "commander";
import unifiedMain from "./commands/unified";

program.name("ns-version").description("CLI unified Update version").version("1.0.0");

program
	.command("unified")
	.alias("u")
	.description("Unified update version \n ignore node_modules")
	.argument("<version>", "target version")
	.action(async (str, options) => {
		console.log(str);
		console.log(String(options));
		await unifiedMain(str);
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
