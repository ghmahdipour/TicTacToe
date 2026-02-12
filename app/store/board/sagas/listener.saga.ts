import { takeEvery, put, select, call, take, race } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import { selectMoves } from '../board.selector';
import type { Move, PlayerRole, RoomData } from '../../../types/board.type';
import { winningCombinations, createCells } from '../../../utils/board.utils';
import { RootState } from '../..';
import { 
    type BoardState,
    addMove,
    listenBoard,
    setWinner,
    setMyTurn,
    stopListeningBoard,
    reset,
    setModalVisible,
    syncResetState,
    opponentLeft
} from '../board.slice';
import { listenerRepository } from '../../../firebase/listener.repository';
import { resetRepository } from '../../../firebase/reset.repository';

function createRoomChannel(roomId: string) {
    return eventChannel(emit => {
        const unsubscribe = listenerRepository.subscribeRoom(roomId, (data: RoomData | null) => {
            emit({ type: 'ROOM_UPDATE', payload: data });
        })
        return () => {
            try {
                unsubscribe;
            } catch(err) {
                console.log(err);
            }
        }    
    })
}

function* handleListenBoard(action: ReturnType<typeof listenBoard>) {
    const roomId = action.payload.roomId;
    const channel: EventChannel<{ payload: RoomData }> = yield call(createRoomChannel, roomId);
    try {
        while(true) {
            const { event, stop }: { 
                event?: { payload: RoomData }, 
                stop?: ReturnType<typeof stopListeningBoard>
            } = yield race({
                event: take(channel),
                stop: take(stopListeningBoard)
            })
            if(stop) break;
            if(!event) { continue; }
            const data: RoomData = event.payload;

            if(!data) {
                yield put(setModalVisible(false));
                yield put(syncResetState({
                    resetRequestedBy: null,
                    resetConfirmBy: []
                }));
                yield put(opponentLeft());
                break;
            }

            if(!data.size || !data.winLen) continue;

            const size = data.size;
            const winLen = data.winLen;

            const moves: Move[] = Object.values(data.moves ?? {});
            const prevMoves: Move[] = yield select(selectMoves);
            // Add new moves
            const newMoves = moves.filter(m => !prevMoves.some(p => p.index === m.index));
            for (const mv of newMoves) {
                yield put (addMove(mv));
            }
            // Calculate winner
            const cells:Move[] = createCells(size, moves);   
            const playedMoves = moves.length;
            const computedWinner = playedMoves >= winLen ?  winningCombinations(cells, size, winLen) : null;
              
            const currentWinner: BoardState['winner'] = yield select((s: RootState) => s.board.winner);
            if(computedWinner !== currentWinner) {
                yield put(setWinner(computedWinner ?? null));
            }
            // Calculate turn 
            const role: PlayerRole = yield select((s: RootState) => s.board.role);
            const isPlayer1 = role === 'x';
            if(!computedWinner) {
                const myTurn = isPlayer1 
                ? moves.length % 2 === 0
                : moves.length % 2 === 1
                yield put(setMyTurn(myTurn));
            }
            // Reset logic
            const resetRequestedBy = ( data.resetRequestedBy as PlayerRole | null) ?? null;
            const resetConfirmByObj: Partial<Record<PlayerRole, boolean>> = data.resetConfirmBy ?? {};

            const resetConfirmByArray: PlayerRole[] = (Object.keys(resetConfirmByObj) as PlayerRole[])
            .filter(k => resetConfirmByObj[k]);

            yield put(syncResetState({
                resetRequestedBy,
                resetConfirmBy: resetConfirmByArray
            }));

            if(resetRequestedBy && resetRequestedBy !== role) {
                yield put(setModalVisible(true));
            }
            if(resetConfirmByObj.x && resetConfirmByObj.o) {
                yield call(resetRepository.applyReset, roomId);
                yield put(reset());
                yield put(setMyTurn(role === 'x'));
                yield put(setWinner(null));
                yield put(setModalVisible(false));
            }
        }
    } finally {
        channel.close();
        console.log('STOPPED LISTENING TO ROOM')
    }
    
}

export function* listenerSaga() {
    yield takeEvery(listenBoard.type, handleListenBoard);
}