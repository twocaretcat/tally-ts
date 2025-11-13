import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 54,
		by: {
			spaces: {
				total: 11,
			},
			letters: {
				total: 38,
			},
			digits: {
				total: 1,
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
		total: 11,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
