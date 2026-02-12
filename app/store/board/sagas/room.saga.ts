import { put, call, fork, takeEvery, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { get } from 'firebase/database';
import type { Move } from '../../../types/board.type';
import { RootState } from '../..';
import { handleError } from '../../../utils/errorHandler';
import { 
    type BoardState, 
    createRoomSuccess, 
    createRoomRequest, 
    joinRoomRequest, 
    listenBoard, 
    joinRoomSuccess, 
    leaveRoom 
} from '../board.slice';
import { roomRepository } from '../../../firebase/room.repository'
import { roomRef } from '../../../firebase/refs';
import { getDB } from '../../../firebase/config';

function* initOnce() {
    try {
        yield call(getDB);
    } catch(err) {
        console.warn(err);
        yield* handleError(err);
    }
}

function* startListening(roomId: string) {
    yield put(listenBoard({ roomId }));
}

function* handleCreateRoom(action: ReturnType<typeof createRoomRequest>) {
    try{
        yield call(initOnce);
        const { level, size, winLen } = action.payload;
        const roomId: string = yield call(roomRepository.createRoom, level, size, winLen);

        if(roomId) {
            yield put(createRoomSuccess({ roomId, size, winLen, level }));
            // Start listening
            yield fork(startListening, roomId);
        } else {
            yield* handleError(new Error ('ROOM COULD NOT BE CREATED'));
        }
    } catch(err) {
        console.log('CREATE ROOM ERROR', err);
        yield* handleError(err);
    }
}

function* handleJoinRoom(action: ReturnType<typeof joinRoomRequest>): SagaIterator {
    try {
        yield call(initOnce);
        const {roomId} = action.payload;
        const ref = roomRef(roomId);
        const snapshot = yield call(get, ref);
        if(!snapshot.exists()) {
            yield* handleError(new Error ('Room not found'));
            return;
        }
        const room = snapshot.val();
        const moves: Move[] = Object.values(room.moves ?? {});

        const myTurn = moves.length % 2 === 0;

        yield put(joinRoomSuccess({ 
            roomId, 
            moves, 
            myTurn, 
            level: room.level, 
            size: room.size, 
            winLen: room.winLen 
        }));
        yield fork(startListening, roomId);
    } catch(err) {
        console.log('MAKE MOVE ERROR:', err);
        yield* handleError(err);
    }
    
}

function* handleLeaveRoom() {
    const state: BoardState = yield select((s: RootState) => s.board);
    const { role, roomId } = state;
   if(role === 'x' && roomId) {
     // Clear room
     yield call(() => roomRepository.deleteRoom(roomId));
   }
}


function* logAllActions() {
  yield takeEvery('*', function* (action: any) {
    console.log('ACTION FROM SAGA:', action.type);
  });
}

export function* roomSaga() {
    yield fork(logAllActions);
    yield takeEvery(createRoomRequest.type, handleCreateRoom);
    yield takeEvery(joinRoomRequest.type, handleJoinRoom);
    yield takeEvery(leaveRoom.type, handleLeaveRoom);
}