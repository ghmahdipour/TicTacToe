import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BoardMode, Move, PlayerRole } from '../../types/board.type';
import { PlayerEnum } from '../../enums/board.enum';

export type BoardState = {
    roomId?: string;
    size?: number;
    winLen?: number;
    level?: BoardMode;
    winner: PlayerEnum | 'Draw' | null;
    myTurn: boolean;
    joined: boolean;
    modalVisible: boolean;
    loading?: boolean;
    error?: string | null;
    moves: Move[];
    resetRequestedBy?: PlayerRole | null;
    resetConfirmBy: PlayerRole[];
    role?: PlayerRole,
    opponentLeft: boolean;
}

const initialState: BoardState = {
    winner: null,
    myTurn: false,
    loading: false,
    error: null,
    moves: [],
    level: undefined,
    size: undefined,
    winLen: undefined,
    role: undefined,
    modalVisible: false,
    resetRequestedBy: null,
    resetConfirmBy: [],
    joined: false,
    opponentLeft: false
}

const slice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        createRoomRequest(state, action: PayloadAction<{ level: BoardMode, size: number; winLen: number }>) {
            state.loading = true
        },
        createRoomSuccess(state, action: PayloadAction<{ 
            roomId: string,
            size: number,
            winLen: number,
            level: BoardMode
        }>) { 
            state.roomId = action.payload.roomId;
            state.moves = [];
            state.winner = null;
            state.myTurn = true;
            state.role = 'x',
            state.size = action.payload.size;
            state.winLen = action.payload.winLen;
            state.level = action.payload.level;
            state.joined = true,
            state.loading = false
        },
        joinRoomRequest(state, action: PayloadAction<{ roomId: string }>) {
            state.loading = true;
            state.joined = false
        },
        joinRoomSuccess(state, action: PayloadAction<{ 
            roomId: string, moves: Move[], myTurn: boolean, level: BoardMode, size: number, winLen: number,
        }>) { 
            state.roomId = action.payload.roomId ;
            state.moves = action.payload.moves || [];
            state.winner = null;
            state.role = 'o';
            state.myTurn = action.payload.myTurn;
            state.size = action.payload.size;
            state.winLen = action.payload.winLen;
            state.level = action.payload.level;
            state.joined = true;
            state.loading = false;
        },
        makeMoveRequest(state, action: PayloadAction<Move>) {},
        addMove(state, action: PayloadAction<Move>) { 
            state.moves.push(action.payload) 
        },
        setWinner(state, action: PayloadAction<BoardState['winner']>){
            state.winner = action.payload
        },
        setMyTurn(state, action: PayloadAction<boolean>){
            state.myTurn = action.payload
        },
        setModalVisible(state, action: PayloadAction<boolean>){
            state.modalVisible = action.payload
        },
        listenBoard(state, action: PayloadAction<{ roomId: string }>) {},
        stopListeningBoard(state){
            state.moves = []; 
            state.winner = null;
            state.myTurn = false;
            state.roomId = undefined;
            state.error = null;
            state.role = undefined;
            state.resetConfirmBy = [];
            state.resetRequestedBy = null;
            state.loading = false;
        },
        setError(state, action) {
            state.loading = false;
            state.roomId = undefined;
            state.error = action.payload;
        },
        requestReset(state, action: PayloadAction<PlayerRole>) {
            state.resetRequestedBy = action.payload;
            state.resetConfirmBy = [action.payload];
        },
        confirmReset(state, action: PayloadAction<PlayerRole>) {
            if(!state.resetConfirmBy.includes(action.payload)) {
                state.resetConfirmBy.push(action.payload);
            }
        },
        denyReset(state) {
            state.resetRequestedBy = null;
            state.resetConfirmBy = [];
            state.modalVisible = false;
        },
        syncResetState(state, action: PayloadAction<{
            resetRequestedBy: PlayerRole | null;
            resetConfirmBy: PlayerRole[];
        }>) {
            state.resetRequestedBy = action.payload.resetRequestedBy;
            state.resetConfirmBy = action.payload.resetConfirmBy;

            if(!action.payload.resetRequestedBy) {
                state.modalVisible = false;
            }
        },
        reset(state) { 
            state.moves = []; 
            state.winner = null;
            state.myTurn = state.role === 'x';
            state.resetRequestedBy = null;
            state.resetConfirmBy = [];
            // Saved until game is restarted in same room
            // state.roomId, size, winLen, level

        },
        resetAllState(state) {
            Object.assign(state, initialState);
            state.roomId = undefined;
        },
        leaveRoom() {},
        opponentLeft(state) {
            state.opponentLeft = true;
        }
        
    }
})

export const {
    createRoomRequest,
    createRoomSuccess,
    joinRoomRequest,
    joinRoomSuccess,
    makeMoveRequest,
    addMove,
    setWinner,
    setMyTurn,
    setModalVisible,
    listenBoard,
    stopListeningBoard,
    setError,
    requestReset,
    confirmReset,
    syncResetState,
    denyReset,
    reset,
    resetAllState,
    leaveRoom,
    opponentLeft
} = slice.actions;

export default slice.reducer;