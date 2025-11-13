import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 243,
		by: {
			spaces: {
				total: 36,
			},
			letters: {
				// OgniindividuohadirittoallavitaallalibertàedallasicurezzadellapropriapersonaNessunindividuopotràesseretenutoinstatodischiavitùodiservitùlaschiavitùelatrattadeglischiavisarannoproibitesottoqualsiasiforma
				total: 201,
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
		total: 38,
	},
	sentences: {
		total: 2,
	},
};

export default expectedOutputMap;
