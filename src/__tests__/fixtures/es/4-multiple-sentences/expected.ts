import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 46,
		by: {
			spaces: {
				total: 8,
			},
			letters: {
				// NopuedodecírseloahoraYanoestansimple
				total: 36,
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
