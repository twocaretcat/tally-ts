/**
 * Generates segmentation data for test fixtures using Node.js's native Intl.Segmenter.
 *
 * This script processes test input files and generates mocked segments (graphemes, words, sentences)
 * using the latest Node.js version's ICU library. The generated segments are used to create mocked
 * `Intl.Segmenter` instances in tests, ensuring consistent output across different JavaScript runtimes
 * when testing the tally-ts library.
 *
 * The script requires a recent version of ICU to ensure deterministic segmentation behavior.
 *
 * @module
 */

import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import process from 'node:process';

const SCRIPT_NAME = 'scripts/generate-segments.mjs';
const FILE = {
	INPUT: 'input.mjs',
	OUTPUT: 'segments.ts',
};
const SEGMENTS_MAP = {
	VAR: 'segmentsMap',
	TYPE: 'SegmentsMap',
};

const cwd = dirname(fileURLToPath(import.meta.url));
const fixturesRootDir = path.join(cwd, '..', 'src', '__tests__', 'fixtures');

/**
 * Validates that the current Node.js runtime has ICU 77.x support.
 *
 * ICU (International Components for Unicode) is required for text segmentation.
 * This function ensures the correct version is available to produce consistent
 * segmentation results across test runs.
 *
 * @returns {boolean} True if ICU 77.x is available, false otherwise
 */
function isIcuVersionSupported() {
	// Check if ICU data is available
	if (!process.versions.icu) {
		const msg = `
⚠️ WARNING: ICU (International Components for Unicode) not available!'
   Node.js was built without ICU support.
	 Please use a Node.js build with full ICU support.
`;

		console.error(msg);

		return false;
	}

	const icuVersion = process.versions.icu;
	const [major] = icuVersion.split('.').map(Number);

	// Required ICU version
	const REQUIRED_ICU_MAJOR = 77;

	if (major !== REQUIRED_ICU_MAJOR) {
		const msg = `
⚠️ WARNING: Unsupported ICU version detected! Please use a Node.js version with the appropriate ICU version
   Current version: ${icuVersion}
	 Required version: ${REQUIRED_ICU_MAJOR}.x
`;

		console.error(msg);

		return false;
	}

	console.info(`✓ ICU version check passed (${icuVersion})\n`);

	return true;
}

/**
 * Dynamically imports a module and returns its default export.
 *
 * @param {string} filePath - Absolute file system path to the module
 * @returns {Promise<any>} The default export of the module
 */
async function loadDefaultExport(filePath) {
	const mod = await import(pathToFileURL(filePath).href);

	return mod.default;
}

/**
 * Segments text using Intl.Segmenter with the specified locale and granularity.
 *
 * @param {string} locale - BCP 47 locale identifier (e.g., 'en-US', 'ja-JP')
 * @param {string} input - Text to segment
 * @param {'grapheme' | 'word' | 'sentence'} granularity - Segmentation granularity
 * @returns {Array<{segment: string, index: number, isWordLike?: boolean}>} Array of segment objects
 */
function segmentText(locale, input, granularity) {
	const segmenter = new Intl.Segmenter(locale, { granularity });

	return Array.from(segmenter.segment(input), (segment) => ({
		segment: segment.segment,
		index: segment.index,
		isWordLike: 'isWordLike' in segment ? segment.isWordLike : undefined,
	}));
}

/**
 * Main script execution: processes all test fixtures and generates segment data.
 *
 * Walks through the fixtures directory structure (locale/testCase/), reads input files,
 * generates segments at all granularities (grapheme, word, sentence), and writes the
 * results to TypeScript files for use in tests.
 *
 * @returns {Promise<void>}
 */
async function main() {
	for (const locale of fs.readdirSync(fixturesRootDir)) {
		const localeDir = path.join(fixturesRootDir, locale);

		if (!fs.statSync(localeDir).isDirectory()) continue;

		for (const testCase of fs.readdirSync(localeDir)) {
			const testCaseDir = path.join(localeDir, testCase);

			if (!fs.statSync(testCaseDir).isDirectory()) continue;

			const inputPath = path.join(testCaseDir, FILE.INPUT);
			const outputPath = path.join(testCaseDir, FILE.OUTPUT);

			if (!fs.existsSync(inputPath)) {
				console.warn(`Skipping ${locale}/${testCase}: no ${FILE.INPUT}`);

				continue;
			}

			const input = await loadDefaultExport(inputPath);

			if (typeof input !== 'string') {
				console.warn(`Skipping ${locale}/${testCase}: input is not a string`);

				continue;
			}

			const result = {
				graphemes: segmentText(locale, input, 'grapheme'),
				words: segmentText(locale, input, 'word'),
				sentences: segmentText(locale, input, 'sentence'),
			};

			const fileContent = `\
// AUTO-GENERATED — DO NOT EDIT
// Run ${SCRIPT_NAME} to regenerate
import type { ${SEGMENTS_MAP.TYPE} } from '../../../types.ts';

const ${SEGMENTS_MAP.VAR}: ${SEGMENTS_MAP.TYPE} = ${JSON.stringify(result, null, '\t')};

export default ${SEGMENTS_MAP.VAR};
`;

			fs.writeFileSync(outputPath, fileContent, 'utf8');

			console.info(`Updated ${path.relative(fixturesRootDir, outputPath)}`);
		}
	}
}

console.info('Generating segments...');

if (!isIcuVersionSupported()) {
	console.warn('Skipping segment generation\n');

	process.exit();
}

main().catch((err) => {
	console.error(err);

	process.exit(1);
});
