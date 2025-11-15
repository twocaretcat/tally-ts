/**
 * Builds the npm distribution for the package using DNT.
 *
 * @module
 */
import { build, emptyDir } from '@deno/dnt';
import deno from '../deno.json' with { type: 'json' };

const author = {
	username: 'twocaretcat',
	domain: 'johng.io',
} as const;
const packageName = 'tally-ts' as const;
const dir = {
	src: './src',
	out: './npm',
} as const;

await emptyDir(dir.out);
await build({
	entryPoints: [
		{
			name: '.',
			path: `${dir.src}/index.ts`,
		},
		{
			name: './legacy',
			path: `${dir.src}/legacy.ts`,
		},
	],
	outDir: dir.out,
	compilerOptions: {
		lib: ['ES2022', 'DOM'],
	},
	shims: {},
	test: false,
	package: {
		name: deno.name,
		version: Deno.args[0] ?? deno.version,
		description:
			`A TypeScript word counting library. Count the number of characters, words, sentences, paragraphs, and lines in your text instantly with ${packageName}.`,
		keywords: [
			'character counter',
			'word counter',
			'sentence counter',
			'paragraph counter',
			'line counter',
			'text analysis',
			'text analyzer',
			'text statistics',
			'library',
			'typescript',
		],
		license: 'MIT',
		author: {
			name: 'John Goodliff',
			url: `https://${author.domain}`,
		},
		repository: {
			type: 'git',
			url: `git+https://github.com/${author.username}/${packageName}.git`,
		},
		homepage: `https://${author.domain}/p/${packageName}`,
		bugs: `https://github.com/${author.username}/${packageName}/issues`,
		funding: [
			{
				type: 'individual',
				url: `https://${author.domain}/funding`,
			},
			{
				type: 'GitHub Sponsors',
				url: `https://github.com/sponsors/${author.username}`,
			},
			{
				type: 'Patreon',
				url: `https://patreon.com/${author.username}`,
			},
			{
				type: 'Brave Creators',
				url: 'https://publishers.basicattentiontoken.org/en/c/johng',
			},
		],
	},
	postBuild() {
		// Copy additional files to npm directory
		Deno.copyFileSync('LICENSE', `${dir.out}/LICENSE`);
		Deno.copyFileSync('README.md', `${dir.out}/README.md`);
	},
});
