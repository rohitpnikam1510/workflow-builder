import { openDB } from 'idb';

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

export const getColumnNames = async (): Promise<string[]> => {
  const db = await openDB('csvDB', 1);
  const store = db.transaction('csvStore', 'readonly').objectStore('csvStore');
  const data = await store.get(0); // Assuming the data is stored at index 0
  if (data && Array.isArray(data) && data.length > 0) {
      // Assuming the first record contains the headers (keys)
      return Object.keys(data[0]);
  }
  return [];
};
