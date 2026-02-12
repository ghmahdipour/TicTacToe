import { useReducer, useEffect, useRef } from 'react';
import { createLocalCells, winningCombinations } from '../utils/board.utils';
import { PlayerEnum } from '../enums/board.enum';
import { boardReducer, LocalState } from '../reducers/board.reducer';
import { PlayerRole } from '../types/board.type';

type Params = {
    enabled: boolean;
    size: number;
    winLen: number;
    triggerMoveSound: (player: PlayerRole) => void;
    triggerWinSound: () => void;
    triggerDrawSound: () => void;
}

type Result = {
    cells: LocalState['cells'];
    winner: LocalState['localWinner'];
    myTurn: boolean;
    handleMove: (index: number) => void;
    handleReset: () => void;
}

export function useSelfGame({
    enabled,
    size, 
    winLen,
    triggerMoveSound,
    triggerWinSound,
    triggerDrawSound
}: Params): Result {
    const [state, dispatchLocal] = useReducer(boardReducer, {
        cells: createLocalCells(size),
        playerX: true,
        localWinner: null
    } as LocalState);

    const soundPlayedRef = useRef(false);

    // ًReset when enabled or size changes
    useEffect(() => {
        if(!enabled) return;
        dispatchLocal({ type: 'RESET', payload: { size } });
        soundPlayedRef.current = false;
    }, [enabled, size])

    // Winner
    useEffect(() => {
        if(!enabled || state.localWinner) return;

        const winner = winningCombinations(state.cells, size, winLen);
        if(!winner) return;

        dispatchLocal({ type: 'WIN', payload: winner });

        if(!soundPlayedRef.current) {
            winner === 'Draw' ? triggerDrawSound() : triggerWinSound();
            soundPlayedRef.current = true;
        }
        
    },[enabled, state.cells, size, winLen]);

    const handleMove = (index: number) => {
        if(!enabled || state.localWinner || state.cells[index].player) return;

        const player = state.playerX ? PlayerEnum.x : PlayerEnum.o;
  
        dispatchLocal({
            type: 'MOVE',
            payload: { index, player: player}
        })
        triggerMoveSound(state.playerX ? 'x' : 'o');
    };

    const handleReset = () => {
        if(!enabled) return;
        soundPlayedRef.current = false;
        dispatchLocal({ type: 'RESET', payload: { size } });
    };

    return {
        cells: state.cells,
        winner: state.localWinner,
        myTurn: state.playerX,
        handleMove,
        handleReset
    }
}