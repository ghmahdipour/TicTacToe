import { all, fork } from 'redux-saga/effects';
import boardSaga from './board/sagas';
import audioSaga from './audio/audio.saga';
import musicSaga from './music/music.saga';

export default function* root() {
    yield all([
        fork(boardSaga),
        fork(audioSaga),
        fork(musicSaga)
    ]);
}