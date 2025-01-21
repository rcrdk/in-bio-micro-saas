/**
 * Generates a URL-friendly slug from a given string.
 *
 * This function takes an input string, normalizes it by removing diacritical marks (e.g., accents),
 * converts it to lowercase, trims whitespace, and replaces spaces or invalid characters with dashes.
 *
 * @param {string} entry - The input string to be converted into a slug.
 * @returns {string} A URL-friendly slug.
 *
 * @example
 * generateSlug('Hello World!'); // 'hello-world'
 * generateSlug('Café au lait!'); // 'cafe-au-lait'
 * generateSlug('   Multiple   Spaces   '); // 'multiple-spaces'
 */
export function generateSlug(entry: string) {
	return entry
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}
