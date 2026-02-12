import React from 'react';
import { View, Pressable, Image } from 'react-native';
import styles from './index.style';
import Images from '../../resources/images';
import { PlayerEnum } from '../../enums/board.enum';
import type { Move } from '../../types/board.type';

type Props = {
    index: number;
    value: Move;
    size: number;
    disabled?: boolean;
    onPress: (i: number) => void;
}

const Cell = (props: Props) => {
    const source = 
        props.value
            && props.value?.player === PlayerEnum.x 
            ? Images.players.x 
            : props.value 
            && props.value?.player === PlayerEnum.o 
            ? Images.players.o 
            : null;
            
    return (
        <Pressable style={[styles.cell, { width: props.size, height: props.size }]} onPress={() => props.onPress(props.index)} disabled={props.disabled}>
            <View>
                <Image source={source} style={{ width: props.size * 0.8, height: props.size * 0.8 }} />
            </View>
        </Pressable>
    )
}

export default Cell;