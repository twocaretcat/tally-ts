/**
 * Main test suite for the {@link Tally} class.
 *
 * @module
 */
import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { Tally } from '../index.ts';
import { createMockSegmenterFactory, getTestCaseLabel, loadDefaultExport } from './utils.ts';
import type { ExpectedOutputMap, SegmentsMap, TestCase } from './types.ts';

const filename = {
	input: 'input.mjs',
	expectedOutputMap: 'expected.ts',
	mockedSegmentMap: 'segments.ts',
} as const;

const cwd = dirname(fileURLToPath(import.meta.url));
const fixturesRootDir = join(cwd, 'fixtures');

/**
 * Discovers and loads all test cases from the fixtures directory.
 *
 * Scans the fixtures directory structure to find all test cases organized by locale.
 * Each locale directory contains subdirectories for individual test cases, which in
 * turn contain input files, expected output, and optional mocked segment data.
 *
 * @returns A Map where keys are locale strings (or undefined) and values are arrays of TestCase objects
 *
 * @example
 * ```typescript
 * const testCases = await loadAllTestCases();
 * // Map {
 * //   'en-US' => [TestCase, TestCase, ...],
 * //   'fr-FR' => [TestCase, TestCase, ...],
 * //   ...
 * // }
 * ```
 */
async function loadAllTestCases(): Promise<Map<string | undefined, TestCase[]>> {
	const testCasesByLocaleMap = new Map<string | undefined, TestCase[]>();

	const locales = fs.readdirSync(fixturesRootDir).filter((name) => {
		const p = join(fixturesRootDir, name);

		return fs.existsSync(p) && fs.statSync(p).isDirectory();
	});

	for (const locale of locales) {
		const localeDir = join(fixturesRootDir, locale);
		const testCases: TestCase[] = [];

		const testCaseIds = fs.readdirSync(localeDir).filter((name) => {
			const p = join(localeDir, name);

			return fs.existsSync(p) && fs.statSync(p).isDirectory();
		});

		for (const testCaseId of testCaseIds) {
			const testCaseDir = join(localeDir, testCaseId);
			const path = {
				input: join(testCaseDir, filename.input),
				expectedOutputMap: join(testCaseDir, filename.expectedOutputMap),
				mockedSegmentMap: join(testCaseDir, filename.mockedSegmentMap),
			} as const;
			const input = await loadDefaultExport<string>(path.input);
			const expectedOutputMap = await loadDefaultExport<ExpectedOutputMap>(
				path.expectedOutputMap,
			);
			const mockedSegmentMap = await loadDefaultExport<SegmentsMap>(
				path.mockedSegmentMap,
			);
			const MockSegmenter = createMockSegmenterFactory(mockedSegmentMap);

			testCases.push({
				label: getTestCaseLabel(testCaseId),
				input,
				expectedOutputMap,
				mockedSegmentMap,
				MockSegmenter,
			});
		}

		testCasesByLocaleMap.set(locale, testCases);
	}

	return testCasesByLocaleMap;
}

/**
 * Executes all test cases across all locales.
 *
 * Loads test cases from the fixtures directory and runs tests for grapheme,
 * word, and sentence counting. Each test case is run with its specified locale
 * and optional mock Segmenter to ensure consistent results.
 *
 * @remarks
 * This function automatically adds a test case for empty string input and
 * organizes tests by locale using nested describe blocks.
 *
 * @example
 * ```typescript
 * // Run all tests including word counting
 * await runAllTestCases();
 *
 * // Run all tests except word counting
 * await runAllTestCases(true);
 * ```
 */
async function runAllTestCases() {
	const testCasesByLocaleMap = await loadAllTestCases();

	testCasesByLocaleMap.set(undefined, [{
		label: 'empty string',
		input: '',
		expectedOutputMap: {
			graphemes: {
				total: 0,
				by: {
					spaces: { total: 0 },
					letters: { total: 0 },
					digits: { total: 0 },
					punctuation: { total: 0 },
					symbols: { total: 0 },
				},
				related: {
					paragraphs: { total: 0 },
					lines: { total: 0 },
				},
			},
			words: { total: 0 },
			sentences: { total: 0 },
		},
	}]);

	for (const [locale, testCases] of testCasesByLocaleMap.entries()) {
		describe(`with locale '${locale}'`, () => {
			for (const { label, input, expectedOutputMap, MockSegmenter } of testCases) {
				const tally = new Tally({
					locales: locale,
					Segmenter: MockSegmenter,
				});

				describe(`and input '${label}'`, () => {
					it('grapheme count is correct', () => {
						const actual = tally.countGraphemes(input);

						expect(actual).toStrictEqual(expectedOutputMap.graphemes);
					});

					it('word count is correct', () => {
						const actual = tally.countWords(input);

						expect(actual).toStrictEqual(expectedOutputMap.words);
					});

					it('sentence count is correct', () => {
						const actual = tally.countSentences(input);

						expect(actual).toStrictEqual(expectedOutputMap.sentences);
					});
				});
			}
		});
	}
}

await runAllTestCases();
