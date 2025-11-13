import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 19,
		by: {
			spaces: {
				total: 0,
			},
			letters: {
				total: 17,
			},
			digits: {
				total: 0,
			},
			punctuation: {
				total: 2,
			},
			symbols: {
				total: 0,
			},
		},
		related: {
			paragraphs: {
				total: 1,
			},
			lines: {
				total: 1,
			},
		},
	},
	// Segmentation suggested by GPT-5:
	// | Segment | Type        | Meaning          |
	// | ------- | ----------- | ---------------- |
	// | 我       | pronoun     | I / me           |
	// | 現在      | noun/adverb | now              |
	// | 不能      | verb phrase | cannot           |
	// | 告訴      | verb        | tell             |
	// | 她       | pronoun     | her              |
	// | 。       | punctuation | —                |
	// | 那       | pronoun     | that             |
	// | 不是      | verb phrase | is not           |
	// | 那麼      | adverb      | so / that (much) |
	// | 簡單      | adjective   | simple           |
	// | 的       | particle    | (nominalizer)    |
	// | 事       | noun        | matter / thing   |
	// | 。       | punctuation | —                |
	words: {
		total: 12,
	},
	// words: false,
	sentences: {
		total: 2,
	},
};

export default expectedOutputMap;
