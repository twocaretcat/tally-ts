import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 54,
		by: {
			spaces: {
				total: 11,
			},
			letters: {
				// Àlépoquedulycéejemelevaisàhtouslesmatins
				total: 40,
			},
			digits: {
				total: 1,
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
		total: 12,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
