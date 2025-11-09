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
