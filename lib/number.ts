/**
 * Converts Persian and Arabic digits to English digits.
 * @param input - The string containing digits to convert.
 * @returns The string with all Persian/Arabic digits replaced by English digits.
 */
export function toEnglishDigits(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '';

  const str = String(input);
  if (!str) return '';

  return str
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
}

/**
 * Recursively converts all string values in an object/array to English digits.
 * Useful for normalizing API requests.
 * @param data - The payload (object, array, string, etc.)
 * @returns The normalized data with English digits.
 */
export function normalizeRequestData(data: unknown): unknown {
  if (typeof data === 'string') {
    return toEnglishDigits(data);
  }

  // Skip null, undefined, boolean, number
  if (data === null || data === undefined || typeof data !== 'object') {
    return data;
  }

  // Handle Date (return as is)
  if (data instanceof Date) {
    return data;
  }

  // Handle FormData
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(normalizeRequestData);
  }

  // Handle Plain Objects
  const newData: Record<string, unknown> = {};
  const obj = data as Record<string, unknown>;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newData[key] = normalizeRequestData(obj[key]);
    }
  }
  return newData;
}
