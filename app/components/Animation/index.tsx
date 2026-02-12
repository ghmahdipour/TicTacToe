import React from 'react';
import LottieView from 'lottie-react-native';
import styles from './index.style';

type Props = {
    style?: object;
    onAnimationFinish?: () => void;
}

const LottieAnimation = (props: Props) => {
    return (
        <LottieView 
            autoPlay
            loop={!props.onAnimationFinish}
            style={props.style || styles.animate}
            source={
                props.onAnimationFinish
                ? require('../../resources/json/splash.json')
                : require('../../resources/json/game.json')
            }
            onAnimationFinish={props.onAnimationFinish}
        />
    )
}

export default LottieAnimation;