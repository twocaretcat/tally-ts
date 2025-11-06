const denoFile = 'deno.json';
const outDir = 'npm';
const outGlob = `${outDir}/**`;

/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
	branches: ['main'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'conventionalcommits',
			},
		],
		[
			'@semantic-release/release-notes-generator',
			{
				preset: 'conventionalcommits',
			},
		],
		[
			'@semantic-release/exec',
			{
				prepareCmd: 'deno run -A scripts/update-version.ts ${nextRelease.version}',
				publishCmd: 'deno task build:npm && deno publish --allow-dirty',
			},
		],
		[
			'@semantic-release/npm',
			{
				npmPublish: true,
				pkgRoot: outDir,
			},
		],
		[
			'@semantic-release/git',
			{
				assets: [denoFile, outGlob],
				message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
		[
			'@semantic-release/github',
			{
				assets: [
					{
						path: [
							'src/**/*.ts',
							'README.md',
							'LICENSE',
							denoFile,
						],
						name: 'jsr-package',
					},
					{
						path: outGlob,
						name: 'npm-package',
					},
				],
			},
		],
	],
};
