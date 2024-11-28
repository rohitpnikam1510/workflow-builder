const flattenObject = (
  obj: Record<string, unknown>,
  parentKey = '',
  result: Record<string, unknown> = {}
): Record<string, unknown> => {
  if (typeof obj !== 'object' || obj === null) {
    // If it's not an object, return as-is
    return result;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      const value = obj[key];

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        // Safely cast `value` to `Record<string, unknown>` for recursion
        flattenObject(value as Record<string, unknown>, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
};

export const flattenData = (data: Array<Record<string, unknown>>): Array<Record<string, unknown>> =>
  data.map((item) => flattenObject(item));
