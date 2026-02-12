import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import boardReducer from './board/board.slice';
import audioReducer from './audio/audio.slice';
import musicReducer from './music/music.slice';
import rootSaga from './rootSaga';

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    board: boardReducer,
    audio: audioReducer,
    music: musicReducer
  },
  middleware: (gd) => gd({ thunk: false }).concat(saga)
});
saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;