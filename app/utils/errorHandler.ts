import { put, select } from 'redux-saga/effects';
import { setError } from '../store/board/board.slice';
import { RootState } from '../store';

export function* handleError(err: unknown) {
    let message = 'Unknown error';
    if(err instanceof Error) {
        message = err.message;
    } else if(typeof err === 'string') {
        message = err;
    } else {
        message = JSON.stringify(err);
    }
    console.log('SAGA ERROR:', message);
    const currentError: string | null = yield select((state: RootState) => state.board.error);
    if(currentError !== message) {
        yield put(setError(message));
    }
}