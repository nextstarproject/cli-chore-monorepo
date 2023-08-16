#!/usr/bin/env node

import { program } from 'commander';

program.name("ns-version").description("CLI unified Update version").version("1.0.0");

program
	.command("unified")
	.alias("u")
	.description("Unified update version")
	.argument("<string>", "target version")
	.action((str, options) => {
		console.log(str);
        console.log(options);
	});

program.parse();