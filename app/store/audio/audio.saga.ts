import { all, takeEvery, delay, select } from 'redux-saga/effects';
import { 
    MoveSound,
    WinSound,
    DrawSound,
    ButtonSound,
    BackSound
} from './audio.slice';

import { playEffect } from './effects';
import { pauseBackgroundMusic, playBackgroundMusic } from '../music/music';

function* handleMoveSound(action: ReturnType<typeof MoveSound>) {
    const key = action.payload === 'x' ? 'movex' : 'moveo';
    playEffect(key);
}

function* handleWinSound(action: ReturnType<typeof WinSound>) {
    const isPlaying: boolean = yield select((state) => state.music.isPlaying);

    pauseBackgroundMusic();
    playEffect('winner');

    if(isPlaying) {
        yield delay(3000);
        playBackgroundMusic();
    }
}

function* handleButtonSound() {
    playEffect('button');
}

function* handleBackButtonSound() {
    playEffect('back');
}

function* handleDrawSound(action: ReturnType<typeof WinSound>) {
    const isPlaying: boolean = yield select((state) => state.music.isPlaying);

    pauseBackgroundMusic();
    playEffect('draw');

    if(isPlaying) {
        yield delay(3000);
        playBackgroundMusic();
    }
}

export default function* audioSaga() {
    yield all([
        takeEvery(MoveSound.type, handleMoveSound),
        takeEvery(WinSound.type, handleWinSound),
        takeEvery(DrawSound.type, handleDrawSound),
        takeEvery(ButtonSound.type, handleButtonSound),
        takeEvery(BackSound.type, handleBackButtonSound)
    ])
}