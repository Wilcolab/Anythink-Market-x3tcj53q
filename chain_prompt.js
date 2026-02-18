/**
 * Converts a given string into kebab-case.
 * Handles spaces, underscores, uppercase letters, punctuation, and mixed separators.
 * Includes comprehensive input validation and error handling.
 *
 * @param {*} input - The input to convert (should be a string)
 * @returns {string} - The kebab-case converted string, or empty string for invalid inputs
 * @throws {TypeError} - If input is not a string, null, or undefined
 */
function toKebabCase(input) {
    // Step 1: Validate input type
    if (input === null || input === undefined) {
        console.warn('Input is null or undefined, returning empty string');
        return '';
    }

    if (typeof input !== 'string') {
        throw new TypeError(
            `Expected string input, received ${typeof input}. Value: ${input}`
        );
    }

    // Step 2: Handle empty string edge case
    if (input.length === 0) {
        return '';
    }

    // Step 3: Normalize the string
    // - Replace underscores with spaces (to treat them like word separators)
    // - Insert a space before uppercase letters (to separate camelCase words)
    // - Remove all punctuation and special characters except spaces
    let normalized = input
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before uppercase in camelCase
        .replace(/([A-Z])+/g, ' $&') // Handle consecutive uppercase letters
        .replace(/[^\w\s-]/g, '') // Remove punctuation and special chars (keep alphanumeric, spaces, hyphens)
        .trim(); // Remove leading/trailing whitespace

    // Step 4: Normalize multiple spaces to single space
    normalized = normalized.replace(/\s+/g, ' ');

    // Step 5: Convert to lowercase and replace spaces with hyphens
    let kebabCased = normalized.toLowerCase().replace(/\s+/g, '-');

    // Step 6: Remove leading/trailing hyphens
    kebabCased = kebabCased.replace(/^-+|-+$/g, '');

    return kebabCased;
}

// ============================================
// Example inputs and outputs
// ============================================

console.log('=== toKebabCase Examples ===\n');

// Basic cases
console.log('Basic spaces:');
console.log(`  Input: "hello world" → Output: "${toKebabCase('hello world')}"`);
console.log(`  Input: "foo bar baz" → Output: "${toKebabCase('foo bar baz')}"\n`);

// Underscores
console.log('Underscores:');
console.log(`  Input: "hello_world" → Output: "${toKebabCase('hello_world')}"`);
console.log(`  Input: "foo_bar_baz" → Output: "${toKebabCase('foo_bar_baz')}"\n`);

// CamelCase
console.log('CamelCase:');
console.log(`  Input: "helloWorld" → Output: "${toKebabCase('helloWorld')}"`);
console.log(`  Input: "fooBarBaz" → Output: "${toKebabCase('fooBarBaz')}"\n`);

// Multiple spaces
console.log('Multiple spaces:');
console.log(`  Input: "hello   world" → Output: "${toKebabCase('hello   world')}"`);
console.log(`  Input: "foo    bar    baz" → Output: "${toKebabCase('foo    bar    baz')}"\n`);

// Punctuation and special characters
console.log('Punctuation and special characters:');
console.log(`  Input: "hello, world!" → Output: "${toKebabCase('hello, world!')}"`);
console.log(`  Input: "foo@bar#baz" → Output: "${toKebabCase('foo@bar#baz')}"\n`);

// Mixed separators and cases
console.log('Mixed separators and cases:');
console.log(`  Input: "HelloWorld_Foo Bar" → Output: "${toKebabCase('HelloWorld_Foo Bar')}"`);
console.log(`  Input: "some-MIXED_case" → Output: "${toKebabCase('some-MIXED_case')}"\n`);

// Edge cases
console.log('Edge cases:');
console.log(`  Input: "" (empty string) → Output: "${toKebabCase('')}"`);
console.log(`  Input: "   " (spaces) → Output: "${toKebabCase('   ')}"`);
console.log(`  Input: null → Output: "${toKebabCase(null)}"`);
console.log(`  Input: undefined → Output: "${toKebabCase(undefined)}"\n`);

// Error handling
console.log('Error handling (invalid types):');
try {
    toKebabCase(123);
} catch (error) {
    console.log(`  Input: 123 → Error: ${error.message}`);
}

try {
    toKebabCase({ key: 'value' });
} catch (error) {
    console.log(`  Input: {key: 'value'} → Error: ${error.message}`);
}

try {
    toKebabCase(['array']);
} catch (error) {
    console.log(`  Input: ['array'] → Error: ${error.message}`);
}

module.exports = toKebabCase;