/**
 * Model Mapper - Variable Name Converter
 * Ported from C# WPF QuickStatement
 * 
 * Converts between snake_case and PascalCase.
 * Optionally generates C# property code.
 */

/**
 * Parse input into an array of variable names
 */
export function parseNames(input: string): string[] {
    return input
        .split(/[\s,]+/)
        .map(n => n.trim())
        .filter(n => n.length > 0);
}

/**
 * Convert snake_case to PascalCase
 * Example: user_id → UserId, CREATED_AT → CreatedAt
 */
export function snakeToPascal(snake: string): string {
    if (!snake) return snake;

    return snake
        .split('_')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

/**
 * Convert PascalCase to snake_case
 * Example: UserId → user_id, CreatedAt → created_at
 */
export function pascalToSnake(pascal: string): string {
    if (!pascal) return pascal;

    return pascal
        .replace(/([A-Z])/g, '_$1')
        .replace(/^_/, '')
        .toLowerCase();
}

/**
 * Generate C# property declaration
 */
export function generateProperty(name: string, dataType: string): string {
    return `public ${dataType} ${name} { get; set; }`;
}

/**
 * Available C# data types for property generation
 */
export const csharpDataTypes = [
    'string',
    'int',
    'long',
    'decimal',
    'double',
    'bool',
    'DateTime',
    'Guid',
    'object',
] as const;

export type CSharpDataType = typeof csharpDataTypes[number];
