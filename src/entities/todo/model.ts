import type { DBSchema } from 'idb';
import { IndexedDBStorage } from 'shared/idb/indexedDBStorage';

interface TodoSchema extends DBSchema {
  todos: {
    key: number;
    value: {
      id?: number;
      task: string;
      date: string;
    };
  };
}
export const todoDBManager = new IndexedDBStorage<TodoSchema>('todos', 1, {
  todos: { keyPath: 'id', autoIncrement: true },
});
