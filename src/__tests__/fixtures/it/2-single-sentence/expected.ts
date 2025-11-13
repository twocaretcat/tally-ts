import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 10,
		by: {
			spaces: {
				total: 1,
			},
			letters: {
				total: 8,
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
		total: 2,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
