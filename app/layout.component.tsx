import React, { ReactNode } from 'react';
import { View, ImageBackground } from 'react-native';
import Images from './resources/images';
import common from './layout.style';

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <View style={common.container}>
            <ImageBackground source={Images.background} style={[common.container]}>
                {children}
            </ImageBackground>
        </View>
    )
}

export default Layout;