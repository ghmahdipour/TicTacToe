import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    splashBox: {
        width: wp(55),
        height: wp(55),
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    splash: {
        width: wp(50),
        height: hp(50)
    }
})