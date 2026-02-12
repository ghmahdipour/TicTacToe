import { ref } from 'firebase/database';
import { getDB } from './config';

export function roomRef(roomId: string) {
    const db = getDB();
    return ref(db, `rooms/${roomId}`);
}

export function movesRef(roomId: string) {
    const db = getDB();
    return ref(db, `rooms/${roomId}/moves`);
}

export function resetRef(roomId: string) {
    const db = getDB();
    return ref(db, `rooms/${roomId}/reset`);
}