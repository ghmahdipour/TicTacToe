import { onValue } from 'firebase/database';
import type { RoomData } from '../types/board.type';
import { roomRef } from './refs';

export const listenerRepository = {
    async subscribeRoom(roomId: string, onUpdate: (data: RoomData | null) => void) {
        const room = roomRef(roomId);
        const unsubscribe = onValue(room, snapshot => {
            if(!snapshot.exists()) {
                onUpdate(null);
                return
            };
            onUpdate(snapshot.val() as RoomData);
        });
        return () => unsubscribe();
    }
}