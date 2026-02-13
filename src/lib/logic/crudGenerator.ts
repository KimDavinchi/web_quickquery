/**
 * CRUD Query Generator
 * Ported from C# WPF QuickStatement
 * 
 * Generates SELECT, INSERT, UPDATE, DELETE SQL queries from table/column input.
 */

export type QueryType = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
export type ParamStyle = 'sqlserver' | 'oracle'; // @ vs :

/**
 * Parse column input into an array of column names
 */
export function parseColumns(input: string): string[] {
    return input
        .split(/[\s,]+/)
        .map(c => c.trim())
        .filter(c => c.length > 0);
}

/**
 * Generate CRUD SQL query
 */
export function generateCrud(
    tableName: string,
    columns: string[],
    queryType: QueryType,
    paramStyle: ParamStyle
): string {
    const prefix = paramStyle === 'sqlserver' ? '@' : ':';
    const table = tableName.trim() || '[TABLE_NAME]';

    switch (queryType) {
        case 'SELECT':
            return generateSelect(table, columns);
        case 'INSERT':
            return generateInsert(table, columns, prefix);
        case 'UPDATE':
            return generateUpdate(table, columns, prefix);
        case 'DELETE':
            return generateDelete(table);
    }
}

function generateSelect(tableName: string, columns: string[]): string {
    return `SELECT
    ${columns.join(',\n    ')}
FROM ${tableName}
WHERE 1=1`;
}

function generateInsert(tableName: string, columns: string[], paramPrefix: string): string {
    return `INSERT INTO ${tableName} (
    ${columns.join(',\n    ')}
) VALUES (
    ${columns.map(c => paramPrefix + c).join(',\n    ')}
)`;
}

function generateUpdate(tableName: string, columns: string[], paramPrefix: string): string {
    const setClauses = columns.map(c => `    ${c} = ${paramPrefix}${c}`);
    return `UPDATE ${tableName}
SET
${setClauses.join(',\n')}
WHERE [condition]`;
}

function generateDelete(tableName: string): string {
    return `DELETE FROM ${tableName}
WHERE [condition]`;
}
