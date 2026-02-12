import { State } from '../types/common.type';

export const initialState: State = {
    visible: false,
    errorModal: false,
    roomCode: '',
    errorMessage: null
}

export type Action = 
 | { type: 'SHOW_ERROR'; payload: string }
 | { type: 'CLOSE_MODAL' }
 | { type: 'OPEN_MODAL' }
 | { type: 'SET_ROOM_CODE'; payload: string }
 | { type: 'RESET_ERROR' }

export function homeReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SHOW_ERROR': 
            return { ...state, errorModal: true, errorMessage: action.payload, roomCode: '' };
        case 'CLOSE_MODAL': 
            return { ...state, visible: false }
        case 'OPEN_MODAL': 
            return { ...state, visible: true }
        case 'SET_ROOM_CODE': 
            return { ...state, roomCode: action.payload }
        case 'RESET_ERROR': 
            return { ...state, errorModal: false, errorMessage: null }
        default:
            return state;
    }
}