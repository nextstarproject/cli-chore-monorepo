export const releaseTypes = [
	"major",
	"premajor",
	"minor",
	"preminor",
	"patch",
	"prepatch",
	"prerelease",
] as const;

export type ReleaseType = (typeof releaseTypes)[number];
