import { ref, set, get } from 'firebase/database';
import { getDB } from './config';
import type { RoomData, BoardMode } from '../types/board.type';
import { roomRef } from './refs';

export async function generateUniqueRoomId(): Promise<string> {
    const database = getDB();
    let roomId: string;
    let exists = true;

    while(exists) {
        roomId = Math.floor(1000 + Math.random() * 9000).toString();
        const roomRef = ref(database, `rooms/${roomId}`);
        const snapshot = await get(roomRef);
        exists = snapshot.exists();
    }
    return roomId!;
}

export const roomRepository = {
    async createRoom(level: BoardMode, size: number, winLen: number) {
        const roomId = await generateUniqueRoomId();
        const ref = roomRef(roomId);
        const roomData: RoomData = {
            level,
            size,
            winLen,
            players: [],
            moves: {}
        }
        set(ref, roomData);
        return roomId;
    },
    async joinRoom(roomId: string, playerId: string) {
        const ref = roomRef(roomId);;
        const snapshot = await get(ref);

        if(!snapshot.exists()) throw new Error('Room not found');

        const room = snapshot.val() as RoomData;
    
        if(room.players && room.players.length >= 2) throw new Error('Room is full');
    
        const updatedPlayers = [...(room.players || []), playerId];
        await set(ref, {
            ...room, 
            players: updatedPlayers
        });
        return roomId;
    },
    async deleteRoom(roomId: string) {
        const db = getDB();
        return set(ref(db, `rooms/${roomId}`), null);
    },
}