import React from 'react';
import { View } from 'react-native';
import styles from './index.style';
import LottieView from 'lottie-react-native';

type Props = {
    visible: boolean;
}

const Loading = ({ visible }: Props) => {
    if (!visible) return null;
    return (
        <View style={styles.overlay}>
            <LottieView autoPlay style={styles.animate} source={require('../../resources/json/loading.json')} />
        </View>
    )
}

export default Loading;