import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 202,
		by: {
			spaces: {
				total: 36,
			},
			letters: {
				// ToutindividuadroitàlavieàlalibertéetàlasûretédesapersonneNulneseratenuenesclavagenienservitudelesclavageetlatraitedesesclavessontinterditssoustoutesleursformes
				total: 159,
			},
			digits: {
				total: 0,
			},
			punctuation: {
				total: 5,
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
		total: 38,
	},
	sentences: {
		total: 2,
	},
};

export default expectedOutputMap;
