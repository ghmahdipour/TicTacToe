import { set, push } from 'firebase/database';
import { movesRef } from './refs';

export const movesRepository = {
    async sendMove(roomId: string, move: { index: number; player: string }){
        const ref = movesRef(roomId);
        const next = push(ref);
        return set(next, move)
    }
}