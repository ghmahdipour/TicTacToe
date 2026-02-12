import { RootState } from "..";

export const selectRoomId = (state: RootState) => state.board.roomId;
export const selectRole = (state: RootState) => state.board.role;
export const selectRoomLoading = (state: RootState) => state.board.loading;
export const selectRoomError = (state: RootState) => state.board.error;
export const selectBoardSize = (state: RootState) => state.board.size;
export const selectLevel = (state: RootState) => state.board.level;
export const selectWinLen = (state: RootState) => state.board.winLen;
export const selectRoomJoined = (state: RootState) => state.board.joined;
export const selectOpponentLeft = (state: RootState) => state.board.opponentLeft;

export const selectMoves = (state: RootState) => state.board.moves;
export const selectWinner = (state: RootState) => state.board.winner;
export const selectMyTurn = (state: RootState) => state.board.myTurn;

export const selectResetRequestedBy = (state: RootState) => state.board.resetRequestedBy;
export const selectResetConfirmBy = (state: RootState) => state.board.resetConfirmBy;
export const selectResetModal = (state: RootState) => state.board.modalVisible;