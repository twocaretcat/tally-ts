/**
 * Builds the npm distribution for the package using DNT.
 *
 * @module
 */
import { build, emptyDir } from '@deno/dnt';
import deno from '../deno.json' with { type: 'json' };

const AUTHOR = {
	username: 'twocaretcat',
	domain: 'johng.io',
} as const;
const PACKAGE_NAME = 'tally-ts' as const;
const DIR = {
	src: './src',
	out: './npm',
} as const;
const FILE = {
	readme: 'README.md',
	license: 'LICENSE',
} as const;

/**
 * Replaces the first occurrence of a given pattern in a file.
 *
 * Reads the file at the specified path, applies a string or regular-expression
 * replacement to its contents, and writes the updated content back to disk.
 *
 * @param path - Path to the file to update.
 * @param search - Text or regular expression to match.
 * @param replacement - Value to insert in place of the matched text.
 * @returns A promise that resolves when the write completes.
 */
async function replaceInFile(
	path: string,
	search: string | RegExp,
	replacement: string,
): Promise<void> {
	const content = await Deno.readTextFile(path);
	const newContent = content.replace(search, replacement);

	return Deno.writeTextFile(path, newContent);
}

await emptyDir(DIR.out);
await build({
	entryPoints: [
		{
			name: '.',
			path: `${DIR.src}/index.ts`,
		},
		{
			name: './legacy',
			path: `${DIR.src}/legacy.ts`,
		},
	],
	outDir: DIR.out,
	compilerOptions: {
		lib: ['ES2022', 'DOM'],
	},
	shims: {},
	test: false,
	package: {
		name: deno.name,
		version: Deno.args[0] ?? deno.version,
		description:
			`A TypeScript word counting library. Count the number of characters, words, sentences, paragraphs, and lines in your text instantly with ${PACKAGE_NAME}.`,
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
			url: `https://${AUTHOR.domain}`,
		},
		repository: {
			type: 'git',
			url: `git+https://github.com/${AUTHOR.username}/${PACKAGE_NAME}.git`,
		},
		homepage: `https://${AUTHOR.domain}/p/${PACKAGE_NAME}`,
		bugs: `https://github.com/${AUTHOR.username}/${PACKAGE_NAME}/issues`,
		funding: [
			{
				type: 'individual',
				url: `https://${AUTHOR.domain}/funding`,
			},
			{
				type: 'GitHub Sponsors',
				url: `https://github.com/sponsors/${AUTHOR.username}`,
			},
			{
				type: 'Patreon',
				url: `https://patreon.com/${AUTHOR.username}`,
			},
			{
				type: 'Brave Creators',
				url: 'https://publishers.basicattentiontoken.org/en/c/johng',
			},
		],
	},
	async postBuild() {
		// Copy additional files to npm directory
		await Promise.all(Object.values(FILE).map((file) => Deno.copyFile(file, `${DIR.out}/${file}`)));

		// Always use the light mode version of the logo in the README for npm
		await replaceInFile(`${DIR.out}/${FILE.readme}`, 'logo.svg', 'logo-light.svg');
	},
});
