import { State } from '../types/common.type';

type StateLevelDifficult = Omit<State, "roomCode">;

export const initialState: StateLevelDifficult = {
    visible: false,
    errorModal: false,
    errorMessage: null
}

export type Action = 
 | { type: 'SHOW_ERROR'; payload: string }
 | { type: 'CLOSE_MODAL' }
 | { type: 'OPEN_MODAL' }
 | { type: 'RESET_ERROR' }

export function levelDifficultReducer(state: StateLevelDifficult, action: Action): StateLevelDifficult {
    switch (action.type) {
        case 'SHOW_ERROR': 
            return { ...state, errorModal: true, errorMessage: action.payload };
        case 'CLOSE_MODAL': 
            return { ...state, visible: false }
        case 'OPEN_MODAL': 
            return { ...state, visible: true }
        case 'RESET_ERROR': 
            return { ...state, errorModal: false, errorMessage: null }
        default:
            return state;
    }
} 