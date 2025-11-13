import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 178,
		by: {
			spaces: {
				total: 30,
			},
			letters: {
				total: 142,
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
		total: 32,
	},
	sentences: {
		total: 2,
	},
};

export default expectedOutputMap;
