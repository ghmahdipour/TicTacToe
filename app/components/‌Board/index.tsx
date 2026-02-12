import React from 'react';
import { View } from 'react-native';
import styles from './index.style';
import { generateGridIndexes } from '../../utils/board.utils'
import { BoardGrid } from './BoardGrid';
import { BOARD_SIZE } from '../../constants/board';
import type { Move } from '../../types/board.type';

type Props = {
    size: number;
    cells: Move[];
    disabled?: boolean;
    onPress: (index: number) => void;
}

const Board = ({size, cells, disabled, onPress}: Props) => {
    const cellSize = BOARD_SIZE / size;
    const grid = generateGridIndexes(size);
    return (
        <View style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
            {BoardGrid(grid, cells, cellSize, onPress, disabled)}
        </View>
    )
}

export default Board;