import { PlayerEnum } from "../enums/board.enum";
import type { Move } from '../types/board.type';

let lastClick = 0;

export function preventDoubleClick(callback: () => void) {
    const now = Date.now();
    if(now - lastClick < 1000) return;
    lastClick = now;
    callback();
}

export const generateGridIndexes = (size: number): number[][] => {
    const rows: number[][] = [];
    let index = 0;
    for (let r=0; r < size; r++) {
        const row: number[] = [];
        for(let c=0; c < size; c++) {
            row.push(index++);
        }
        rows.push(row);
    }
    return rows;
}

export function createLocalCells(size: number): Move[] {
    return Array(size * size).fill(null).map((_, i) => ({
        index: i, player: ''
    }));
}
// export function createLocalCells(size: number): string[] {
//     return Array(size * size).fill('');
// }
export function createCells(size: number, moves?: Move[]): Move[] {
    const arr: Move[] = Array(size * size).fill(null).map((_, i) => ({
        index: i,
        player: ''
    }));
    moves?.forEach(m  => {
        if(typeof m.index === 'number' && m.index >= 0 && m.index < arr.length){
            arr[m.index] = m
        }
    })
    return arr;
}  

// number[][]
export function winningCombinations(cells: Move[], size: number, winLen:number): PlayerEnum | 'Draw' | null {
    
    const playedMoves = cells.filter(c => c.player).length;
    if(playedMoves < winLen) return null;
    
    const combos: number[][] = [];
    const index = (r:number, c:number) => r * size + c;

    // rows
    for (let r=0; r < size; r++) {
        for (let c=0; c <= size - winLen; c++) {
            const seq: number[] = [];
            for(let k=0; k < winLen; k++) {
                seq.push(index(r, c+k));
            }
            combos.push(seq)
        }
    }
    // cols
    for (let c=0; c < size; c++) {
        for (let r=0; r <= size - winLen; r++) {
            const seq: number[] = [];
            for(let k=0; k < winLen; k++) {
                seq.push(index(r+k, c));
            }
            combos.push(seq)
        }
    }
    // down-right
    for (let r=0; r <= size - winLen; r++) {
        for (let c=0; c <= size - winLen; c++) {
            const seq: number[] = [];
            for(let k=0; k < winLen; k++) {
                seq.push(index(r+k, c+k));
            }
            combos.push(seq)
        }
    }
    // up-right
    for (let r = winLen-1; r < size; r++) {
        for (let c=0; c <= size - winLen; c++) {
            const seq: number[] = [];
            for(let k=0; k < winLen; k++) {
                seq.push(index(r-k, c+k));
            }
            combos.push(seq)
        }
    }

    // Calculate winner
    for (const seq of combos) {
        const firstPlayer = cells[seq[0]].player;
        if(!firstPlayer) continue;
        if(seq.every(i => cells[i].player === firstPlayer)){
            return firstPlayer as PlayerEnum;
        };
    }
    // Calculate مساوی
    if(cells.every(c => c.player)) return 'Draw';
    return null;
}