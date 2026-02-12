import React from 'react';
import { Image, Pressable } from 'react-native';
import Images from '../../resources/images';
import styles from './index.style';

type Props = {
    onPress: () => void;
}

const TopBar = (props: Props) => {
    return (
        <Pressable style={styles.backBtn} onPress={props.onPress}>
            <Image source={Images.previous} style={styles.backIcon} />
        </Pressable>
    )
}

export default TopBar;