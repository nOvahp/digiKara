/**
 * Converts Persian and Arabic digits to English digits.
 * @param input - The string containing digits to convert.
 * @returns The string with all Persian/Arabic digits replaced by English digits.
 */
export function toEnglishDigits(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return "";
  
  const str = String(input);
  if (!str) return "";

  return str
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/**
 * Recursively converts all string values in an object/array to English digits.
 * Useful for normalizing API requests.
 * @param data - The payload (object, array, string, etc.)
 * @returns The normalized data with English digits.
 */
export function normalizeRequestData(data: any): any {
  if (typeof data === "string") {
    return toEnglishDigits(data);
  }
  
  // Skip null, undefined, boolean, number
  if (data === null || data === undefined || typeof data !== "object") {
    return data;
  }

  // Handle Date (return as is)
  if (data instanceof Date) {
    return data;
  }

  // Handle FormData (skip or implement if needed - usually risky to recreate)
  if (typeof FormData !== "undefined" && data instanceof FormData) {
    // For now, we skip FormData to avoid breaking file uploads/complexity
    // If strict requirement, we would need to iterate entries and create new FormData
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(normalizeRequestData);
  }
  
  // Handle Plain Objects
  const newData: any = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
       newData[key] = normalizeRequestData(data[key]);
    }
  }
  return newData;
}
