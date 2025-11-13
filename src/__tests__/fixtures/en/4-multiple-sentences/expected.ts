import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 51,
		by: {
			spaces: {
				total: 9,
			},
			letters: {
				total: 38,
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
				total: 1,
			},
			lines: {
				total: 1,
			},
		},
	},
	words: {
		total: 10,
	},
	sentences: {
		total: 2,
	},
};

export default expectedOutputMap;
