import { takeLatest, call, put } from 'redux-saga/effects';
import { 
    initMusicRequest,
    initMusic,
    startMusic,
    stopMusic,
    pauseMusic,
    resumeMusic
} from './music.slice';
import { saveMusicPreference, loadMusicPreference} from '../../utils/musicPreference';
import { pauseBackgroundMusic, playBackgroundMusic } from './music';

function* handleInitMusic() {
    const enabled: boolean = yield call(loadMusicPreference);

    if(enabled) {
        yield put(initMusic());
        yield call(playBackgroundMusic);
    } else {
        yield put(stopMusic());
        yield call(pauseBackgroundMusic);
    }
}

function* handleStartMusic() {
    yield call(playBackgroundMusic);
    yield call(saveMusicPreference, true);
}

function* handleStopMusic() {
    yield call(pauseBackgroundMusic);
    yield call(saveMusicPreference, false);
}

function* handlePauseMusic() {
    yield call(pauseBackgroundMusic);
}

function* handleResumeMusic() {
    yield call(playBackgroundMusic);
}

export default function* musicSaga() {
    yield takeLatest(initMusicRequest.type, handleInitMusic);
    yield takeLatest(startMusic.type, handleStartMusic);
    yield takeLatest(stopMusic.type, handleStopMusic);
    yield takeLatest(pauseMusic.type, handlePauseMusic);
    yield takeLatest(resumeMusic.type, handleResumeMusic);
}
