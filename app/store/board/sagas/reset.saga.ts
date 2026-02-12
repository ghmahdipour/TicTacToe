import { select, call, takeEvery } from 'redux-saga/effects';
import { selectRoomId } from '../board.selector';
import type { PlayerRole } from '../../../types/board.type';
import { RootState } from '../..';
import { 
    type BoardState,
    requestReset,
    confirmReset,
    denyReset
} from '../board.slice';
import { resetRepository } from '../../../firebase/reset.repository';

function* handleRequestReset(action: ReturnType<typeof requestReset>) {
    const state: BoardState = yield select((s: RootState) => s.board);
    const requester = action.payload;
    if(requester === 'o' && !state.winner) {
      return;
    }
    const roomId: string | undefined = yield select(selectRoomId);
    if(!roomId) return;
    yield call (resetRepository.sendResetRequest, roomId, requester)
  }
  
  function* handleConfirmReset() {
      const state: BoardState = yield select((s: RootState) => s.board);

      const role: PlayerRole | undefined = state.role;
      const roomId: string | undefined = yield select(selectRoomId);
      if(!role || !roomId) return;
  
      yield call(resetRepository.sendResetConfirm, roomId, role);
  }
  
  function* handleDenyReset() {
      const roomId: string | undefined = yield select((s: RootState) => s.board.roomId);
     if(roomId) {
       // Clear reset request in firebase
       yield call(resetRepository.sendResetDeny, roomId);
     }
  }

export function* resetSaga() {
    yield takeEvery(requestReset.type, handleRequestReset);
    yield takeEvery(confirmReset.type, handleConfirmReset);
    yield takeEvery(denyReset.type, handleDenyReset);
}