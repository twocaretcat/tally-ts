/**
 * A set of simple Unicode-aware character classifiers.
 *
 * This module provides small helper functions for determining the general
 * category of a single grapheme. Each function takes a string representing
 * one grapheme and returns a boolean indicating whether it belongs to a
 * particular Unicode General Category or related semantic class.
 *
 * The checks are performed using Unicode property escapes in regular
 * expressions (`\p{...}`), ensuring consistent behavior for scripts across
 * languages and writing systems.
 */

/**
 * Checks if a grapheme is a digit as per Unicode General Category Nd (Number, Decimal Digit).
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a digit
 */
export const isDigit = (grapheme: string) => /\p{Nd}/u.test(grapheme);

/**
 * Checks if a grapheme is a letter as per Unicode General Category L (Letter).
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a letter
 */
export const isLetter = (grapheme: string) => /\p{L}/u.test(grapheme);

/**
 * Checks if a grapheme is a space as per Unicode General Category Zs (Space Separator).
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a space
 */
export const isSpace = (grapheme: string) => /\p{Zs}/u.test(grapheme);

/**
 * Checks if a grapheme is a symbol a symbol as per Unicode General Category P (Punctuation)
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is punctuation
 */
export const isPunctuation = (grapheme: string) => /\p{P}/u.test(grapheme);

/**
 * Checks if a grapheme is a symbol a symbol as per Unicode General Category S (Symbol)
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a space
 */
export const isSymbol = (grapheme: string) => /\p{S}/u.test(grapheme);

/**
 * Checks if a grapheme is a newline.
 *
 * @param grapheme - The grapheme to check
 * @returns True if the grapheme is a newline
 */
export const isNewline = (grapheme: string): boolean => grapheme === '\n';
