import { openDB } from "idb";
    
// initialize IndexDB
const dbPromise = openDB('csvDataDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('csvData')) {
      const store = db.createObjectStore('csvData', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('csvIndex', 'name');
    }
  },
});

// Store CSV data
export const storeCsvData = async (data: Record<string, unknown>[]) => {
  const db = await dbPromise;
  const tx = db.transaction('csvData', 'readwrite');
  const store = tx.objectStore('csvData');
  await store.put({ name: 'csvFile', data }); // Store under a name for retrieval
  await tx.done;
};

// Get CSV data
export const getCsvData = async () => {
  const db = await dbPromise;
  const tx = db.transaction('csvData', 'readonly');
  const store = tx.objectStore('csvData');
  const data = await store.getAll();
  await tx.done;
  return data;
};