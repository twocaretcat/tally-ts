/**
 * A locale-aware text analysis library that provides comprehensive counting
 * and classification of text elements using the Unicode-aware Intl.Segmenter API.
 *
 * This module enables accurate counting of graphemes, words, and sentences across
 * different languages and writing systems, with detailed breakdowns by character type
 * (letters, digits, spaces, punctuation, symbols) and structural elements (lines, paragraphs).
 *
 * @example Basic usage
 * ```ts
 * import { Tally } from "@twocaretcat/tally-ts";
 *
 * const counter = new Tally("en");
 * const text = "Hello, world! 👋\nThis is a test.";
 *
 * // Count all elements at once
 * const counts = counter.countAll(text);
 * console.log(counts.words.total); // 7
 * console.log(counts.graphemes.by.punctuation.total); // 2
 * console.log(counts.lines.total); // 2
 * ```
 *
 * @example Locale-specific counting
 * ```ts
 * import { Tally } from "@twocaretcat/tally-ts";
 *
 * // Use Japanese locale for proper word segmentation
 * const jaCounter = new Tally("ja");
 * const result = jaCounter.countWords("これはテストです");
 * console.log(result.total); // Correctly segments Japanese text
 * ```
 *
 * @example Detailed grapheme analysis
 * ```ts
 * import { Tally } from "@twocaretcat/tally-ts";
 *
 * const counter = new Tally();
 * const graphemes = counter.countGraphemes("Hello 123! 🎉");
 *
 * console.log(graphemes.total); // Total graphemes including emoji
 * console.log(graphemes.by.letters.total); // Letter count
 * console.log(graphemes.by.digits.total); // Digit count
 * console.log(graphemes.by.symbols.total); // Symbol count (includes emoji)
 * ```
 *
 * @module
 */

import { isDigit, isLetter, isNewline, isPunctuation, isSpace, isSymbol } from './classifier.ts';
import type { AllCounts, GraphemeCount, Options, SegmenterInterface, SentenceCount, WordCount } from './types.ts';

/**
 * Text counter that uses Intl.Segmenter for locale-aware text analysis.
 * Creates segmenters once for efficient reuse across multiple counting operations.
 */
export class Tally {
	private graphemeSegmenter: SegmenterInterface;
	private wordSegmenter: SegmenterInterface;
	private sentenceSegmenter: SegmenterInterface;
	private resolvedLocale: string;

	/**
	 * Creates a new Tally instance
	 *
	 * @param options - Configuration options including locale(s) and custom Segmenter constructor
	 * @throws {Error} If Intl.Segmenter is not available and no custom Segmenter is provided
	 */
	constructor(options: Options = {}) {
		const { locales, Segmenter } = options;
		const SegmenterImpl = Segmenter ?? Intl?.Segmenter;

		if (!SegmenterImpl) {
			throw new Error(
				'Intl.Segmenter is not available in this environment. Tally requires Intl.Segmenter support, which is available in modern runtimes and browsers (see https://webstatus.dev/features/intl-segmenter). Please upgrade your environment or provide a custom Segmenter implementation via the options.',
			);
		}

		this.graphemeSegmenter = new SegmenterImpl(locales, {
			granularity: 'grapheme',
		});
		this.wordSegmenter = new SegmenterImpl(locales, {
			granularity: 'word',
		});
		this.sentenceSegmenter = new SegmenterImpl(locales, {
			granularity: 'sentence',
		});
		this.resolvedLocale = this.graphemeSegmenter.resolvedOptions().locale;
	}

	/**
	 * Gets the resolved locale used by this counter
	 */
	getResolvedLocale(): string {
		return this.resolvedLocale;
	}

	/**
	 * Counts graphemes in text with a breakdown by grapheme type.
	 * Also counts lines and paragraphs in a single pass for efficiency.
	 *
	 * @param text - The text to analyze
	 * @returns Object containing grapheme counts, lines, paragraphs
	 */
	countGraphemes(text: string): GraphemeCount {
		let wasLastGraphemeNewline = false;

		// Total
		let total = 0;

		// By
		let spaces = 0;
		let letters = 0;
		let digits = 0;
		let punctuation = 0;
		let symbols = 0;

		// Related
		let paragraphs = 0;
		let lines = 0;

		for (
			const { segment: currentGrapheme } of this.graphemeSegmenter.segment(
				text,
			)
		) {
			total++;

			if (isNewline(currentGrapheme)) {
				lines++;

				if (wasLastGraphemeNewline) {
					paragraphs++;

					wasLastGraphemeNewline = false;
				}

				continue;
			}

			wasLastGraphemeNewline = true;

			if (isLetter(currentGrapheme)) {
				letters++;
			} else if (isDigit(currentGrapheme)) {
				digits++;
			} else if (isSpace(currentGrapheme)) {
				spaces++;
			} else if (isPunctuation(currentGrapheme)) {
				punctuation++;
			} else if (isSymbol(currentGrapheme)) {
				symbols++;
			}
		}

		if (wasLastGraphemeNewline) {
			paragraphs++;
		}

		// Count the last line if it doesn't end with a newline
		if (total > 0) {
			lines++;
		}

		return {
			total,
			by: {
				spaces: {
					total: spaces,
				},
				letters: {
					total: letters,
				},
				digits: {
					total: digits,
				},
				punctuation: {
					total: punctuation,
				},
				symbols: {
					total: symbols,
				},
			},
			related: {
				paragraphs: {
					total: paragraphs,
				},
				lines: {
					total: lines,
				},
			},
		};
	}

	/**
	 * Counts words in text using locale-aware segmentation
	 *
	 * @param text - The text to analyze
	 * @returns Object containing total word count
	 */
	countWords(text: string): WordCount {
		let total = 0;

		for (const { isWordLike } of this.wordSegmenter.segment(text)) {
			if (isWordLike) {
				total++;
			}
		}

		return {
			total,
		};
	}

	/**
	 * Counts sentences in text using locale-aware segmentation
	 *
	 * @param text - The text to analyze
	 * @returns Object containing total sentence count
	 */
	countSentences(text: string): SentenceCount {
		let total = 0;

		for (
			const { segment: currentSentence } of this.sentenceSegmenter.segment(
				text,
			)
		) {
			// Don't count empty lines as sentences
			if (currentSentence.trim() === '') {
				continue;
			}

			total++;
		}

		return {
			total,
		};
	}

	/**
	 * Performs all text analysis operations and returns combined counts.
	 *
	 * @param text - The text to analyze
	 * @returns An object containing all count types (graphemes, words, sentences, paragraphs, lines)
	 */
	countAll(text: string): AllCounts {
		const graphemesResult = this.countGraphemes(text);
		const wordsResult = this.countWords(text);
		const sentencesResult = this.countSentences(text);

		return {
			graphemes: graphemesResult,
			words: wordsResult,
			sentences: sentencesResult,
			paragraphs: graphemesResult.related.paragraphs,
			lines: graphemesResult.related.lines,
		};
	}
}
