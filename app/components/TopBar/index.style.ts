import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: wp(5),
        left: wp(5),
        padding: 10,
        zIndex: 10
    },
    backIcon: {
        width: wp(10),
        height: wp(10)
    }
})