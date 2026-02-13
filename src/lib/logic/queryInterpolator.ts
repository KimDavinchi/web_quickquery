/**
 * Query Interpolator - Parameter Substitution
 * Ported from C# WPF QuickStatement
 * 
 * Replaces placeholders (?, @p0, :1) in SQL queries with actual parameter values.
 */

export type PlaceholderType = 'question' | 'sqlserver' | 'oracle';

/**
 * Parse parameters from newline-separated input
 */
export function parseParameters(input: string): string[] {
    return input
        .split(/[\r\n]+/)
        .map(p => p.trim())
        .filter(p => p.length > 0);
}

/**
 * Interpolate SQL query by replacing placeholders with parameter values
 */
export function interpolateQuery(
    sql: string,
    params: string[],
    placeholderType: PlaceholderType,
    addQuotes: boolean
): string {
    const wrap = (val: string) => addQuotes ? `'${val}'` : val;

    if (placeholderType === 'question') {
        // Sequential ? placeholder replacement (JDBC style)
        return replaceQuestionMarks(sql, params, wrap);
    }

    // Indexed placeholder replacement (@p0, @p1... or :1, :2...)
    return replaceIndexedPlaceholders(sql, params, placeholderType, wrap);
}

/**
 * Replace ? placeholders sequentially with parameter values
 */
function replaceQuestionMarks(
    sql: string,
    params: string[],
    wrap: (val: string) => string
): string {
    let idx = 0;
    let result = '';

    for (const char of sql) {
        if (char === '?') {
            if (idx < params.length) {
                result += wrap(params[idx++]);
            } else {
                result += '?';
            }
        } else {
            result += char;
        }
    }

    return result;
}

/**
 * Replace indexed placeholders (@p0, @p1... or :1, :2...)
 */
function replaceIndexedPlaceholders(
    sql: string,
    params: string[],
    placeholderType: PlaceholderType,
    wrap: (val: string) => string
): string {
    let result = sql;

    // Replace in reverse order to avoid issues with :1 matching in :10, :11, etc.
    for (let i = params.length - 1; i >= 0; i--) {
        const placeholder = placeholderType === 'sqlserver'
            ? `@p${i}`
            : `:${i + 1}`;

        // Escape special regex characters in placeholder
        const escaped = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'g');
        result = result.replace(regex, wrap(params[i]));
    }

    return result;
}
