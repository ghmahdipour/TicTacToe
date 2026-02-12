import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        zIndex: 999,
        minWidth: 180,
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        marginBottom: 6
    },
    progressBg: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 4,
        overflow: 'hidden'
    },
    progressBar: {
        height: 4,
        backgroundColor: '#4CAF50',
        borderRadius: 4
    }
})