import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.48)'
    },
    animate: {
        width: 350,
        height: 350
    }
})