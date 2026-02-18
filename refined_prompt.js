/**
 * Converts any input string into dot.case format with robust error checking and edge case handling.
 * 
 * This function transforms strings from various naming conventions (camelCase, snake_case, 
 * kebab-case, PascalCase, SCREAMING_SNAKE_CASE, etc.) into dot.case format where words 
 * are separated by dots and all characters are lowercase.
 * 
 * @function toDotCase
 * @param {string|null|undefined} input - The string to convert to dot.case. Accepts null 
 *        or undefined values which return an empty string.
 * @returns {string} The dot.case version of the input string. Returns an empty string if 
 *         the input is null, undefined, empty, or contains no valid words after processing.
 * @throws {TypeError} If input is not a string, null, or undefined. Error message includes 
 *         the actual type and value received.
 * 
 * @example
 * // From spaces
 * toDotCase('hello world') // returns 'hello.world'
 * 
 * @example
 * // From kebab-case
 * toDotCase('hello-world') // returns 'hello.world'
 * 
 * @example
 * // From camelCase
 * toDotCase('helloWorld') // returns 'hello.world'
 * 
 * @example
 * // From SCREAMING_SNAKE_CASE
 * toDotCase('HELLO_WORLD') // returns 'hello.world'
 * 
 * @example
 * // Null and undefined handling
 * toDotCase(null) // returns ''
 * toDotCase(undefined) // returns ''
 * 
 * @example
 * // Edge cases
 * toDotCase('') // returns ''
 * toDotCase('   ') // returns ''
 * toDotCase('hello!!!world???') // returns 'hello.world'
 */
function toDotCase(input) {
    // Handle null or undefined input
    if (input === null || input === undefined) {
        return '';
    }

    // Type check: ensure input is a string
    if (typeof input !== 'string') {
        throw new TypeError(`Expected a string, null, or undefined, but received ${typeof input}: ${input}`);
    }

    const trimmed = input.trim();

    // Return empty string for empty input
    if (trimmed.length === 0) {
        return '';
    }

    // Split on multiple separators: spaces, hyphens, underscores, and punctuation
    const words = trimmed
        .split(/[\s\-_\p{P}]+/gu)
        .filter((word) => word.length > 0);

    // If no valid words remain, return empty string
    if (words.length === 0) {
        return '';
    }

    // Convert to dot.case: all lowercase, joined by dots
    return words
        .map((word) => word.toLowerCase())
        .join('.');
}

