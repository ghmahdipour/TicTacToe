import React from 'react';
import { View } from 'react-native';
import { Animation } from '../../components';
import { type SplashScreenNavigationProp } from '../../types/navigation.type';
import styles from './index.style';

type Props = {
    navigation: SplashScreenNavigationProp;
}

const SplashScreen = (props: Props) => {
    return (
        <View style={styles.splashBox}>
            <Animation
                style={styles.splash}
                onAnimationFinish={() => {
                    props.navigation.replace('Home');
                }}
            />
        </View> 
    )
}

export default SplashScreen;