export enum Stores {
  Settings = 'settings',
  Tasks = 'tasks',
  Timer = 'timer'
}

export interface BaseIDBProps {
  id: string;
}

export interface IDBData<T> extends BaseIDBProps {
  value: T;
}
const IDB_NAME = 'spiderFocus';

export default class IndexedDBWrapper {

  constructor(private objectStoreName: Stores) { }

  private async getConnection(): Promise<IDBDatabase | null> {
    return new Promise((resolve, reject) => {
      const version = Number(process.env.NEXT_PUBLIC_IDB_VERSION) || 1;
      const request = window.indexedDB.open(IDB_NAME, version);

      request.onupgradeneeded = () => {
        const db = request.result;

        this.createStores(db);
        this.deleteStores(db);

        resolve(db);
      };

      request.onsuccess = () => {
        const db = request.result;

        resolve(db);
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  }

  private createStores(db: IDBDatabase) {
    Object.values(Stores).forEach(store => {

      if (!db.objectStoreNames.contains(store))
        db.createObjectStore(store, { keyPath: 'id' });
    });
  }

  private deleteStores(db: IDBDatabase) {
    Object.values(db.objectStoreNames).forEach(objStore => {

      if (!Object.values(Stores).includes(objStore as Stores))
        db.deleteObjectStore(objStore);
    });
  }

  async add<T>(data: IDBData<T>) {
    return new Promise(async (resolve, reject) => {
      const db = await this.getConnection();

      if (!db) {
        this.logError('addData', db);
        return reject('Database not available.');
      }

      const transaction = db.transaction(this.objectStoreName, 'readwrite');
      const store = transaction.objectStore(this.objectStoreName);

      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);

      request.onerror = () => reject('Error adding data into IndexedDB.');
    });
  }

  async addMultiple<T extends BaseIDBProps>(data: T[]) {
    return new Promise(async (resolve, reject) => {
      const db = await this.getConnection();

      if (!db) {
        this.logError('addMultiple', db);
        return reject('Database not available.');
      }

      const transaction = db.transaction(this.objectStoreName, "readwrite");

      data.forEach(item => transaction.objectStore(this.objectStoreName).put(item));

      transaction.oncomplete = () => resolve(true);

      transaction.onerror = () => reject('Error adding data into IndexedDB.');
    });
  };

  async removeItem(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const db = await this.getConnection();

      if (!db) {
        this.logError('removeItem', db);
        return reject('Database not available.');
      }

      const transaction = db.transaction(this.objectStoreName, 'readwrite');
      const store = transaction.objectStore(this.objectStoreName);

      const request = store.delete(id);

      request.onsuccess = () => resolve();

      request.onerror = () => reject('Error adding data into IndexedDB.');
    });
  }

  async removeMultiple<T extends BaseIDBProps>(data: T[]) {
    return new Promise(async (resolve, reject) => {
      const db = await this.getConnection();

      if (!db) {
        this.logError('removeMultiple', db);
        return reject('Database not available.');
      }

      const transaction = db.transaction(this.objectStoreName, "readwrite");

      data.forEach(item => transaction.objectStore(this.objectStoreName).delete(item.id));

      transaction.oncomplete = () => resolve(true);

      transaction.onerror = () => reject('Error removing item from IndexedDB.');
    });
  };

  async fetch<T>(id: string): Promise<IDBData<T>> {
    return new Promise(async (resolve, reject) => {
      const db = await this.getConnection();

      if (!db) {
        this.logError('fetchData', db);
        return reject('Database not available.');
      }

      const transaction = db.transaction(this.objectStoreName, 'readonly');
      const store = transaction.objectStore(this.objectStoreName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);

      request.onerror = () => reject('Error getting data from IndexedDB.');
    });
  }

  async fetchAll<T>(): Promise<T[]> {
    return new Promise(async (resolve, reject) => {
      const db = await this.getConnection();

      if (!db) {
        this.logError('addData', db);
        return reject('Database not available.');
      }

      const transaction = db.transaction([this.objectStoreName]);
      const objectStore = transaction.objectStore(this.objectStoreName);
      const request = objectStore.openCursor();
      const data: T[] = [];

      request.onsuccess = () => {
        const cursor = request.result;

        if (cursor) {
          const iDBData = cursor.value as IDBData<T>;

          data.push(iDBData.value);

          cursor.continue();
        }
        else {
          resolve(data);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  private logError(methodName: string, db: IDBDatabase | null) {
    console.log(`Database not available for ${methodName}, objStore: ${this.objectStoreName}.`, db);
  }
}
