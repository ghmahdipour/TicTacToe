import React, { ReactNode } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import styles from '../../layout.style';

type Props = {
    children: ReactNode;
    customStyles?: StyleProp<TextStyle | undefined>;
}

const CustomText = ({ children, customStyles }: Props) => (
    <Text style={[{...styles.customTextStyle}, customStyles]}>{children}</Text>
)

export default CustomText;