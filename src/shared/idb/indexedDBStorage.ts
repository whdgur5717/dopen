import {
  DBSchema,
  IDBPDatabase,
  type StoreKey,
  StoreNames,
  type StoreValue,
  openDB,
} from 'idb';

export class IndexedDBStorage<T extends DBSchema> {
  private db: Promise<IDBPDatabase<T>>;

  constructor(
    dbName: string,
    version: number,
    stores: {
      [K in keyof T]: {
        keyPath?: string;
        autoIncrement?: boolean;
      };
    },
  ) {
    this.db = openDB<T>(dbName, version, {
      upgrade(db) {
        Object.entries(stores).forEach(([storeName, options]) => {
          if (!db.objectStoreNames.contains(storeName as StoreNames<T>)) {
            db.createObjectStore(storeName as StoreNames<T>, options);
          }
        });
      },
    });
  }
  async add<S extends StoreNames<T>>(storeName: S, value: StoreValue<T, S>) {
    const db = await this.db;
    return db.add(storeName, value);
  }

  async getAll<S extends StoreNames<T>>(storeName: S) {
    const db = await this.db;
    return await db.getAll(storeName);
  }

  async getById<S extends StoreNames<T>>(storeName: S, id: StoreKey<T, S>) {
    const db = await this.db;
    return await db.get(storeName, id);
  }

  async update<S extends StoreNames<T>>(storeName: S, value: StoreValue<T, S>) {
    const db = await this.db;
    return await db.put(storeName, value);
  }

  async delete<S extends StoreNames<T>>(
    storeName: S,
    id: StoreKey<T, S>,
  ): Promise<void> {
    const db = await this.db;
    await db.delete(storeName, id);
  }

  async clear<S extends StoreNames<T>>(storeName: S) {
    const db = await this.db;
    await db.clear(storeName);
  }
}
