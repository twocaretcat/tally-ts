import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 49,
		by: {
			spaces: {
				total: 9,
			},
			letters: {
				total: 38,
			},
			digits: {
				total: 1,
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
		total: 9,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
