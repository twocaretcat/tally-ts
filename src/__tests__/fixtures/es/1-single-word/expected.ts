import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 13,
		by: {
			spaces: {
				total: 0,
			},
			letters: {
				total: 11,
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
	words: {
		total: 1,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
