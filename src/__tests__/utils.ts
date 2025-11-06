import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { Tally } from '../index.ts';

type Locale = ConstructorParameters<typeof Tally>[0];
type GraphemeCount = ReturnType<typeof Tally.prototype.countGraphemes>;
type WordCount = ReturnType<typeof Tally.prototype.countWords>;
type SentenceCount = ReturnType<typeof Tally.prototype.countSentences>;

/**
 * A test case definition for validating Tally counting methods.
 *
 * Each test case includes input text and expected counts for graphemes, words, and sentences.
 */
type TestCase = {
	label: string;
	input: string;
	expectedGraphemes: GraphemeCount;
	expectedWords: WordCount;
	expectedSentences: SentenceCount;
};

/**
 * Array of test case definitions.
 */
type TestCases = TestCase[];

/**
 * Executes a suite of Tally counting tests for a given locale.
 *
 * Validates grapheme, word, and sentence counting against expected values
 * for each test case using Bun's test runner.
 *
 * @param locale - The locale to use for creating the Tally instance
 * @param testCases - Array of test cases with inputs and expected outputs
 */
export function runTests(
	locale: Locale,
	testCases: TestCases,
	skipCountWords = false,
) {
	const tally = new Tally(locale);

	for (const testCase of testCases) {
		const {
			input,
			label,
			expectedGraphemes,
			expectedWords,
			expectedSentences,
		} = testCase;

		describe(`with ${label}`, () => {
			it(`grapheme count is correct`, () => {
				const actualGraphemes = tally.countGraphemes(input);

				expect(actualGraphemes).toStrictEqual(expectedGraphemes);
			});

			it(`word count is correct`, { ignore: skipCountWords }, () => {
				const actualWords = tally.countWords(input);

				expect(actualWords).toStrictEqual(expectedWords);
			});

			it(`sentence count is correct`, () => {
				const actualSentences = tally.countSentences(input);

				expect(actualSentences).toStrictEqual(expectedSentences);
			});
		});
	}
}
