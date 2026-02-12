import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import language from '../../languages/tokens';
import styles from './index.style';
import { Text } from '..';

type Props = {
    message: string;
    visible: boolean;
    duration?: number;
}

const Toast = ({ visible, message, duration = 5000 }: Props) => {
    const progress = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if(visible) {
            progress.setValue(0);
            Animated.timing(progress, {
                toValue: 1,
                duration,
                useNativeDriver: false
            }).start();
        }
    }, [visible]);
    if(!visible) return null;

    const widthInterpolate = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    })

    return (
        <Animatable.View
            animation="fadeInUp"
            duration={900}
            style={styles.container}
        >
            <Text customStyles={styles.text}>{message}</Text>
            <View style={styles.progressBg}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        { width: widthInterpolate }
                    ]}
                />
            </View>
        </Animatable.View>
    )
}

export default Toast;