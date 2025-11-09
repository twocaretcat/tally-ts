/**
 * Type definitions for Tally.
 *
 * @module
 */

/**
 * A simple count object containing only a total.
 *
 * @property total - The total count value
 */
type TotalCount = {
	total: number;
};

/**
 * A count object with a total and subcategory breakdown.
 *
 * @typeParam T - Record type defining the subcategory counts
 * @property total - The total count value
 * @property by - Breakdown of counts by subcategory
 */
type Count<
	T extends Record<string, TotalCount | Count> = Record<string, TotalCount>,
> = TotalCount & {
	by: T;
};

/**
 * Grapheme count object returned by countGraphemes.
 *
 * @property total - Total grapheme count
 * @property by - Breakdown by grapheme type (spaces, letters, digits, punctuation, symbols)
 * @property related - Related counts (lines, paragraphs)
 */
export interface GraphemeCount extends
	Count<{
		spaces: TotalCount;
		letters: TotalCount;
		digits: TotalCount;
		punctuation: TotalCount;
		symbols: TotalCount;
	}> {
	related: {
		paragraphs: TotalCount;
		lines: TotalCount;
	};
}

/**
 * Word count object returned by countWords.
 */
export type WordCount = TotalCount;

/**
 * Sentence count object returned by countSentences.
 */
export type SentenceCount = TotalCount;

/**
 * Combined results from all counting methods.
 *
 * Includes grapheme counts (excluding related), word counts, sentence counts,
 * and related counts (lines, paragraphs) at the top level.
 */
export type AllCounts = GraphemeCount['related'] & {
	graphemes: Omit<GraphemeCount, 'related'>;
	words: WordCount;
	sentences: SentenceCount;
};

/**
 * Options for configuring the Tally instance.
 */
export interface Options {
	/** The locale or locales to use for segmentation (default: 'en')
	 *
	 * This is passed directly to the Segmenter constructor.
	 */
	locales?: Intl.LocalesArgument;
	/** Custom Segmenter constructor (e.g., a polyfill or alternative implementation) */
	Segmenter?: SegmenterConstructor;
}

/**
 * Segment result returned by the segment() method.
 */
interface Segment {
	/** The segmented text */
	segment: string;
	/** Whether the segment is word-like (only needed for word segmentation) */
	isWordLike?: boolean;
}

/**
 * Options for creating a Segmenter instance.
 */
interface SegmenterOptions {
	/** The granularity level: 'grapheme', 'word', or 'sentence' */
	granularity: 'grapheme' | 'word' | 'sentence';
}

/**
 * Resolved options returned by resolvedOptions().
 */
interface ResolvedSegmenterOptions {
	/** The resolved locale */
	locale: string;
}

/**
 * Minimal Segmenter interface that defines only what Tally needs.
 * Compatible with Intl.Segmenter but doesn't require implementing the full API.
 */
export interface SegmenterInterface {
	/**
	 * Segments the input text according to the segmenter's granularity.
	 * @param input - The text to segment
	 * @returns An iterable of segment data
	 */
	segment(input: string): Iterable<Segment>;

	/**
	 * Returns the resolved options for this segmenter.
	 * @returns Object containing at least the resolved locale
	 */
	resolvedOptions(): ResolvedSegmenterOptions;
}

/**
 * Constructor signature for Segmenter implementations.
 */
export interface SegmenterConstructor {
	new (locale?: Intl.LocalesArgument, options?: SegmenterOptions): SegmenterInterface;
}
