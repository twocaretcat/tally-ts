import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 14,
		by: {
			spaces: {
				total: 2,
			},
			letters: {
				total: 11,
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
	words: {
		total: 3,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
