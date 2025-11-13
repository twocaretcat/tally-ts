import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 63,
		by: {
			spaces: {
				total: 11,
			},
			letters: {
				// JenepeuxpasluidiremaintenantCenestplusaussisimple
				total: 49,
			},
			digits: {
				total: 0,
			},
			punctuation: {
				total: 3,
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
		total: 2,
	},
};

export default expectedOutputMap;
