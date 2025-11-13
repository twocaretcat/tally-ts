/**
 * Type definitions for the tally-ts test suite.
 *
 * @module types
 */
import type { Tally } from '../index.ts';
import type { SegmenterConstructor } from '../types.ts';

type GraphemeCount = ReturnType<typeof Tally.prototype.countGraphemes>;
type WordCount = ReturnType<typeof Tally.prototype.countWords>;
type SentenceCount = ReturnType<typeof Tally.prototype.countSentences>;

type Segment = {
	segment: string;
	index: number;
};

type WordSegment = Segment & {
	isWordLike: boolean;
};

/**
 * Expected output structure for a test case.
 *
 * Contains the expected counts for graphemes, words, and sentences
 * that should be returned by Tally's counting methods.
 */
export type ExpectedOutputMap = {
	graphemes: GraphemeCount;
	words: WordCount;
	sentences: SentenceCount;
};

/**
 * Map of mocked segments for all granularities.
 *
 * Used to provide consistent, predefined segmentation results
 * during testing to avoid platform-specific variations.
 */
export type SegmentsMap = {
	graphemes: Segment[];
	words: WordSegment[];
	sentences: Segment[];
};

type SegmenterConstructorParams = ConstructorParameters<SegmenterConstructor>;

/**
 * Locale or array of locales for segmentation.
 */
export type Locales = SegmenterConstructorParams[0];

/**
 * Options for configuring the Segmenter.
 */
export type SegmenterOptions = SegmenterConstructorParams[1];

export type Granularity = Exclude<SegmenterOptions, undefined>['granularity'];

/**
 * Represents a single test case with input, expected output, and optional mocking.
 *
 * A test case includes the input string to test, the expected results for all
 * counting operations, and optional mocked data to ensure consistent segmentation.
 */
export type TestCase = {
	label: string;
	input: string;
	expectedOutputMap: ExpectedOutputMap;
	mockedSegmentMap?: SegmentsMap;
	MockSegmenter?: SegmenterConstructor;
};
