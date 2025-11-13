import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 65,
		by: {
			spaces: {
				total: 12,
			},
			letters: {
				// IchkannesihrjetztnichtsagenDasistnichtmehrsoeinfach
				total: 51,
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
		total: 13,
	},
	sentences: {
		total: 2,
	},
};

export default expectedOutputMap;
