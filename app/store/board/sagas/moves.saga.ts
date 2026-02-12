import { put, select, call, takeEvery } from 'redux-saga/effects';
import { selectMoves, selectRoomId } from '../board.selector';
import type { Move } from '../../../types/board.type';
import { addMove, makeMoveRequest } from '..//board.slice';
import { handleError } from '../../../utils/errorHandler';
import { movesRepository } from '../../../firebase/moves.repository';

function* handleMakeMove(action: ReturnType<typeof makeMoveRequest>) {
    try {
        const move: Move = action.payload;
        const moves: Move[] = yield select(selectMoves);

        if(moves.some(m => m.index === move.index)) return;
        if(move.index < 0) return;

        yield put(addMove(move));

        const roomId: string | undefined = yield select(selectRoomId);
        if(roomId) {
            yield call(movesRepository.sendMove, roomId, move);
        }
    } catch(err) {
        console.log('MAKE MOVE ERROR', err);
        yield* handleError(err);
    }
    
}

export function* movesSaga() {
    yield takeEvery(makeMoveRequest.type, handleMakeMove);
}