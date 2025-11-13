import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 16,
		by: {
			spaces: {
				total: 0,
			},
			letters: {
				total: 15,
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
		total: 1,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
