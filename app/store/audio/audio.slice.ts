import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type PlayerRole } from '../../types/board.type';

type AudioState = {
    lastSound?: string;
}

const initialState: AudioState = {
    lastSound: undefined
}

const slice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        MoveSound(state, action: PayloadAction<PlayerRole>) {
            state.lastSound = action.payload;
        },
        WinSound(state) { 
            state.lastSound = 'winner';
        },
        ButtonSound(state) {
            state.lastSound = 'button';
        },
        BackSound(state) {
            state.lastSound = 'back';
        },
        DrawSound(state) {
            state.lastSound = 'draw';
        }
    }
})

export const {
    MoveSound,
    WinSound,
    ButtonSound,
    BackSound,
    DrawSound
} = slice.actions;

export default slice.reducer;