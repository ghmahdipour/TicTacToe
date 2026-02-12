import React, { forwardRef, ReactNode, Ref } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { View, Pressable,  } from 'react-native';
import { preventDoubleClick } from '../../utils/board.utils';
import styles from './index.style';

type Props = {
    children: ReactNode;
    onPress: () => void;
    customStyle?: StyleProp<TextStyle | undefined>;
    disabled?: boolean; 
}

const Button = forwardRef<View, Props>(({ children, customStyle, disabled, onPress }, ref?: Ref<View>) => {
    return (
        <Pressable disabled={disabled} style={[{...styles.btn}, customStyle]} ref={ref} onPress={() => preventDoubleClick(onPress)}>
            {children}
        </Pressable>
    )
})

export default Button;