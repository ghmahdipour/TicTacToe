import { PlayerEnum } from '../enums/board.enum';
import { createCells } from '../utils/board.utils';
import { type Move } from '../types/board.type';

export type LocalState = {
    cells: Move[];
    playerX: boolean;
    localWinner: PlayerEnum | 'Draw' | null;
}

type LocalAction = 
 | { type: 'INIT'; payload: { size: number; moves?: Move[] } }
 | { type: 'MOVE'; payload: { index: number; player: PlayerEnum } }
 | { type: 'WIN'; payload: PlayerEnum | 'Draw' }
 | { type: 'RESET'; payload: { size: number } }

export function boardReducer(state: LocalState, action: LocalAction): LocalState {
    switch (action.type) {
        case 'INIT': 
        const { size, moves } = action.payload;
            return { 
                ...state, 
                cells: moves ? createCells(size, moves) : createCells(size),
                localWinner: null,
                playerX: true
            };
        case 'MOVE': 
            const next = [...state.cells];
            next[action.payload.index] = { index: action.payload.index, player: action.payload.player}
            if(state.localWinner) {
                return {...state, cells: next};
            }
            return { ...state, cells: next, playerX: !state.playerX}
        case 'WIN': 
            return { ...state, localWinner: action.payload }
        case 'RESET': 
            return { cells: createCells(action.payload.size), playerX: true, localWinner: null }
        default:
            return state;
    }
}