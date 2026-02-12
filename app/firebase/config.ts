import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

let db: ReturnType<typeof getDatabase> | null = null;

export function getDB() {
    if(!db) {
        const app = initializeApp(firebaseConfig);
        db = getDatabase(app);
    }
    return db;
}
  