import { all, fork } from 'redux-saga/effects';
import { roomSaga } from './room.saga';
import { movesSaga } from './moves.saga';
import { resetSaga } from './reset.saga';
import { listenerSaga } from './listener.saga';

export default function* boardSaga() {
    yield all([
        fork(roomSaga),
        fork(movesSaga),
        fork(resetSaga),
        fork(listenerSaga)
    ]);
}