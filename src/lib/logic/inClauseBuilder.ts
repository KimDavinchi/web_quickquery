/**
 * Smart IN-Clause Generator
 * Ported from C# WPF QuickStatement
 * 
 * Converts newline-separated values into SQL IN clause format.
 * Supports Oracle 1000-item limit splitting.
 */

const ORACLE_IN_CLAUSE_LIMIT = 1000;

export interface InClauseOptions {
  addQuotes: boolean;
  separator: 'comma' | 'pipe';
  oracleSplit: boolean;
}

/**
 * Parse input text into an array of trimmed, non-empty values
 */
export function parseInputValues(input: string): string[] {
  return input
    .split(/[\r\n]+/)
    .map(v => v.trim())
    .filter(v => v.length > 0);
}

/**
 * Generate SQL IN clause from an array of values
 */
export function generateInClause(
  values: string[],
  options: InClauseOptions
): string {
  const { addQuotes, separator, oracleSplit } = options;
  const sep = separator === 'comma' ? ', ' : ' | ';
  
  // Apply quotes if needed
  const formatted = values.map(v => addQuotes ? `'${v}'` : v);
  
  // Oracle 1000-item limit: split into multiple IN clauses
  if (oracleSplit && formatted.length > ORACLE_IN_CLAUSE_LIMIT) {
    const chunks: string[][] = [];
    for (let i = 0; i < formatted.length; i += ORACLE_IN_CLAUSE_LIMIT) {
      chunks.push(formatted.slice(i, i + ORACLE_IN_CLAUSE_LIMIT));
    }
    
    return chunks
      .map((chunk, i) => 
        i === 0 
          ? `IN (${chunk.join(sep)})` 
          : `OR column IN (${chunk.join(sep)})`
      )
      .join('\n');
  }
  
  // Standard IN clause
  return `IN (${formatted.join(sep)})`;
}
