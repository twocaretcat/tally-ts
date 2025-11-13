/**
 * Utility functions for the tally-ts test suite.
 *
 * @module
 */
import { existsSync } from 'node:fs';
import type { Segmenter, SegmenterConstructor } from '../types.ts';
import { pathToFileURL } from 'node:url';
import type { Granularity, Locales, SegmenterOptions, SegmentsMap } from './types.ts';

/**
 * Mapping of test case directory names to human-readable labels.
 */
const TEST_CASE_LABEL_MAP = {
	'1-single-word': 'single word',
	'2-single-sentence': 'single sentence',
	'3-single-sentence-w-punctuation': 'single sentence w/ punctuation',
	'4-multiple-sentences': 'multiple sentences',
	'5-multiple-paragraphs': 'multiple paragraphs',
} as const;

/**
 * Dynamically imports a TypeScript module and returns its default export.
 *
 * @template T - The expected type of the default export
 * @param filePath - Path to the module file to import
 * @returns The default export of the module
 * @throws {Error} If the file doesn't exist or has no default export
 *
 * @example
 * ```typescript
 * const input = await loadDefaultExport<string>('./fixtures/en/1-single-word/input.mjs');
 * const expected = await loadDefaultExport<ExpectedMap>('./fixtures/en/1-single-word/expected.ts');
 * ```
 */
export async function loadDefaultExport<T>(filePath: string): Promise<T> {
	if (!existsSync(filePath)) {
		throw new Error(`Missing ${filePath} file`);
	}

	const mod = await import(pathToFileURL(filePath).href);
	const data = mod.default as T;

	if (data === undefined || data === null) {
		throw new Error(`Missing ${filePath} file`);
	}

	return data;
}

/**
 * Retrieves a human-readable label for a test case ID.
 *
 * @param testCaseId - The test case directory name (e.g., '1-single-word')
 * @returns A human-readable label for the test case
 *
 * @remarks
 * If no label is found in the map, logs a warning and returns the original ID.
 *
 * @example
 * ```typescript
 * getTestCaseLabel('1-single-word'); // Returns: 'single word'
 * getTestCaseLabel('unknown-id'); // Returns: 'unknown-id' (with warning)
 * ```
 */
export function getTestCaseLabel(testCaseId: string): string {
	const label = TEST_CASE_LABEL_MAP[testCaseId as keyof typeof TEST_CASE_LABEL_MAP];

	if (!label) {
		console.warn(`No label found for test case ID: '${testCaseId}'`);

		return testCaseId;
	}

	return label;
}

/**
 * Creates a mock Segmenter constructor bound to predefined segment data.
 *
 * Returns a class that implements the Segmenter interface, allowing tests to use
 * consistent, predefined segmentation results instead of relying on platform-specific
 * Intl.Segmenter behavior.
 *
 * @param mockedSegments - Map of mocked segments for all granularities (grapheme, word, sentence)
 * @returns A constructor function that creates MockSegmenter instances
 *
 * @example
 * ```typescript
 * const mockedSegments = {
 *   graphemes: [{ segment: 'h', index: 0 }, { segment: 'i', index: 1 }],
 *   words: [{ segment: 'hi', index: 0, isWordLike: true }],
 *   sentences: [{ segment: 'hi', index: 0 }]
 * };
 * const MockSegmenter = createMockSegmenterFactory(mockedSegments);
 * const tally = new Tally({ Segmenter: MockSegmenter });
 * ```
 */
export function createMockSegmenterFactory(mockedSegments: SegmentsMap): SegmenterConstructor {
	return class MockSegmenter implements Segmenter {
		private locale: string;
		private granularity: Granularity;

		/**
		 * Creates a new MockSegmenter instance.
		 *
		 * @param locales - Locale string, array of locales, Intl.Locale object, or undefined
		 * @param options - Segmenter options including granularity
		 */
		constructor(
			locales?: Locales,
			options?: SegmenterOptions,
		) {
			// Resolve locale - handle string, array, or undefined
			if (Array.isArray(locales)) {
				this.locale = locales[0] ?? 'en';
			} else if (typeof locales === 'string') {
				this.locale = locales;
			} else if (locales && typeof locales === 'object' && 'baseName' in locales) {
				// Handle Intl.Locale object
				this.locale = locales.baseName;
			} else {
				this.locale = 'en';
			}

			this.granularity = options?.granularity ?? 'grapheme';
		}

		/**
		 * Returns an iterable of mocked segments for the specified granularity.
		 *
		 * @param _input - Input string (unused in mock, included for interface compatibility)
		 * @returns An iterable of segments matching the current granularity
		 */
		segment(_input: string) {
			const key = this.granularity === 'grapheme' ? 'graphemes' : this.granularity === 'word' ? 'words' : 'sentences';

			const segments = mockedSegments[key] ?? [];

			return {
				/**
				 * Iterator: yields each segment in order.
				 * Required by SegmenterInterface.
				 */
				[Symbol.iterator]() {
					return segments[Symbol.iterator]();
				},
			};
		}

		/**
		 * Returns the resolved locale and granularity options.
		 *
		 * @returns An object containing the resolved locale and granularity
		 */
		resolvedOptions() {
			return {
				locale: this.locale,
				granularity: this.granularity,
			};
		}
	};
}
