import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    symbolBox: {
        alignItems: 'center',
        paddingVertical: hp(1),
        paddingHorizontal: wp(4),
        marginHorizontal: wp(4),
        borderRadius: wp(2),
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    activeSymbol: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        transform: [{ scale: 1.1 }]
    },
    symbolLabel: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelX: {
        color: '#E06B80'
    },
    labelO: {
        color: '#435663'
    },
    symbolIcon: {
        width: 40,
        height: 40
    }
})