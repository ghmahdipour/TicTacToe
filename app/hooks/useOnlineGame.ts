import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    makeMoveRequest, 
    requestReset, 
    setModalVisible, 
    listenBoard, 
    denyReset, 
    confirmReset ,
    leaveRoom,
    stopListeningBoard
} from '../store/board/board.slice';
import { 
    selectMoves, 
    selectWinner, 
    selectMyTurn, 
    selectRoomId, 
    selectRole, 
    selectResetModal, 
    selectResetRequestedBy,
    selectOpponentLeft,
    selectBoardSize,
    selectLevel,
    selectWinLen
} from '../store/board/board.selector'
import { createCells } from '../utils/board.utils';
import { PlayerEnum } from '../enums/board.enum';
import { type Move, PlayerRole, BoardMode } from '../types/board.type';

type Params = {
    enabled: boolean;
    roomCode?: string;
    size: number;
    triggerMoveSound: (player: PlayerRole) => void;
    triggerWinSound: () => void;
    triggerDrawSound: () => void;
}

type Result = {
    cells: Move[];
    // winner: string | null;
    winner: PlayerEnum | 'Draw' | null;
    level?: BoardMode;
    myTurn: boolean;
    roomId?: string | null;
    playerRole: PlayerRole;
    resetRequester?: PlayerRole | null;
    modalVisible: boolean;
    isLoadingOnline: boolean;
    opponentLeft: boolean;
    handleMove: (index: number) => void;
    handleReset: () => void;
    handleBack: () => void;
    handleConfirmReset: () => void;
    rejectReset: () => void;
}

export function useOnlineGame({
    enabled,
    size, 
    roomCode,
    triggerMoveSound,
    triggerWinSound,
    triggerDrawSound
}: Params): Result {
    const dispatch = useDispatch();

   const moves = useSelector(selectMoves);
   const winner = useSelector(selectWinner);
   const myTurn = useSelector(selectMyTurn);
   const roomId = useSelector(selectRoomId);
   const role = useSelector(selectRole);

   const remoteSize = useSelector(selectBoardSize);
   const remoteLevel = useSelector(selectLevel);
   const remoteWinLen = useSelector(selectWinLen);

   const modalVisible = useSelector(selectResetModal);
   const resetRequester = useSelector(selectResetRequestedBy);

   const opponentLeft = useSelector(selectOpponentLeft);

   const playerRole: PlayerRole = role ?? 'x';

   const isLoadingOnline = enabled && (!remoteSize || !remoteLevel || !remoteWinLen)
    
   const soundPlayedRef = useRef(false);

   // Start listening
   useEffect(() => {
        if(!enabled) return;
        if(roomId || roomCode) {
            dispatch(listenBoard({ roomId: roomId ?? roomCode! }));
        }
        soundPlayedRef.current = false;

    }, [enabled, roomId, roomCode])

    // Winner sound
    useEffect(() => {
        if(!enabled) return;

        if(!winner) {
            soundPlayedRef.current = false;
            return;
        }
        if(soundPlayedRef.current) return;

        if(!soundPlayedRef.current) {
            winner === 'Draw' ? triggerDrawSound() : triggerWinSound();
            soundPlayedRef.current = true;
        } 
    }, [enabled, winner])

    const handleMove = (index: number) => {
        if(!enabled || !myTurn || winner) return;

        const player = playerRole === 'x' ? PlayerEnum.x : PlayerEnum.o;
  
        dispatch(makeMoveRequest({ index, player }));
        triggerMoveSound(playerRole);
    };

    const handleReset = () => {
        if(!enabled) return;
        soundPlayedRef.current = false;
        dispatch(requestReset(playerRole));
        dispatch(setModalVisible(true));
    };

    const handleBack = () => {
        if(!enabled) return;
        soundPlayedRef.current = false;
        dispatch(leaveRoom());
        dispatch(stopListeningBoard());
    };

    const handleConfirmReset = () => {
        if(!enabled) return;
        soundPlayedRef.current = false;
        dispatch(confirmReset(playerRole));
        dispatch(setModalVisible(false));
    }

    const rejectReset = () => {
        if(!enabled) return;
        dispatch(denyReset());
        dispatch(setModalVisible(false));
    }

    return {
        cells: createCells(size, moves),
        winner,
        myTurn,
        playerRole,
        resetRequester,
        modalVisible,
        opponentLeft,
        isLoadingOnline,
        roomId,
        level: remoteLevel,
        handleMove,
        handleReset,
        handleBack,
        handleConfirmReset,
        rejectReset
    }
}