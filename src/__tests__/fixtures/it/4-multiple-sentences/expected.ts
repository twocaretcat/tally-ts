import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 52,
		by: {
			spaces: {
				total: 8,
			},
			letters: {
				// NonpossodirglieloadessoNonèpiùcosìsemplice
				total: 42,
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
		total: 9,
	},
	sentences: {
		total: 2,
	},
};

export default expectedOutputMap;
