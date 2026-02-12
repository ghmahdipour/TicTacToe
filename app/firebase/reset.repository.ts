import { ref, update } from 'firebase/database';
import { getDB } from './config';
import type { PlayerRole } from '../types/board.type';

export const resetRepository = {
    async sendResetRequest(roomId: string, requester: PlayerRole){
        const db = getDB();
        return update(ref(db, `rooms/${roomId}`), {
            resetRequestedBy: requester,
            resetConfirmBy: {
                [requester]: true
            }
        })
    },
    async sendResetConfirm(roomId: string, role: PlayerRole){
        const db = getDB();
        return update(ref(db, `rooms/${roomId}/resetConfirmBy`), {
            [role]: true
        });
    },
    async sendResetDeny(roomId: string){
        const db = getDB();
        return update(ref(db, `rooms/${roomId}`), {
            resetRequestedBy: null,
            resetConfirmBy: {}
        })
    },
    async applyReset(roomId: string){
        const db = getDB();
        return update(ref(db, `rooms/${roomId}`), {
            moves: {},
            resetRequestedBy: null,
            resetConfirmBy: {}
        })
    }
}