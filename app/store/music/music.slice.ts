import { createSlice } from '@reduxjs/toolkit';

type MusicState = {
    isPlaying: boolean;
}

const initialState: MusicState = {
    isPlaying: true
}

const slice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        initMusicRequest: (state) => state,
        initMusic: (state) => {
            state.isPlaying = true;
        },
        startMusic: (state) => {
            state.isPlaying = true;
        },
        stopMusic: (state) => { 
            state.isPlaying = false;
        },
        pauseMusic: () => {},
        resumeMusic: () => {}
    }
})

export const {
    initMusicRequest,
    initMusic,
    startMusic,
    stopMusic,
    pauseMusic,
    resumeMusic
} = slice.actions;

export default slice.reducer;