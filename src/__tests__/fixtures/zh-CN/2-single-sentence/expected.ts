import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 4,
		by: {
			spaces: {
				total: 0,
			},
			letters: {
				total: 3,
			},
			digits: {
				total: 0,
			},
			punctuation: {
				total: 1,
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
	// | Segment | Type        | Meaning         |
	// | ------- | ----------- | --------------- |
	// | 我       | pronoun     | I / me          |
	// | 想       | verb        | miss / think of |
	// | 你       | pronoun     | you             |
	// | 。       | punctuation | —               |
	words: {
		total: 3,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
