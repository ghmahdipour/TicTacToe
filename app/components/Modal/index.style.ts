import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from "../../constants/colors";

export default StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: Colors.lightBlack,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: wp('80%'),
        backgroundColor: Colors.lightPink,
        borderRadius: 20,
        borderWidth: 8,
        borderColor: Colors.violet,
        paddingVertical: hp(1),
        alignItems: 'center'
    }
})