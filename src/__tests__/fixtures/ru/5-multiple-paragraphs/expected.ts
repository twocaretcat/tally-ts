import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 201,
		by: {
			spaces: {
				total: 28,
			},
			letters: {
				total: 167,
			},
			digits: {
				total: 0,
			},
			punctuation: {
				total: 4,
			},
			symbols: {
				total: 0,
			},
		},
		related: {
			paragraphs: {
				total: 2,
			},
			lines: {
				total: 3,
			},
		},
	},
	words: {
		total: 30,
	},
	sentences: {
		total: 2,
	},
};

export default expectedOutputMap;
