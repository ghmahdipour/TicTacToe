import React from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Cell from '../../Cell';
import styles from './index.style';
import type { Move } from '../../../types/board.type';

export const BoardGrid = (
    grid: number[][], 
    cells: Move[], 
    cellSize: number,
    onPress: (i:number) => void,
    disabled?: boolean
) => {
    return grid.map((row, gIndex) => (
        <View key={`row-${gIndex}`} style={styles.row}>
            {row.map((rIndex) => (
                <Animatable.View 
                    style={styles.boardMainWrapper}
                    key={`cell-${rIndex}`}
                    animation="lightSpeedIn"
                    delay={rIndex * 20}
                >
                    <Cell value={cells[rIndex]} onPress={onPress} disabled={disabled} index={rIndex} size={cellSize} />
                </Animatable.View>
            ))}
        </View>
    ))
}