import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Font from "../../../constants/fonts";
import Colors from "../../../constants/colors";

export default StyleSheet.create({
    closeBtn: {
        position: 'absolute',
        top: -13,
        right: -16,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    close: {
        width: wp(8),
        height: wp(8)
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: wp(3),
        paddingTop: hp(6)
    },
    input: {
        width: '65%',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 8,
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        fontSize: Font.font_14,
        color: Colors.black
    },
    btnText: {
        fontSize: Font.font_20,
        color: Colors.primaryText
    },
    text: {
        marginVertical: hp(1)
    }
})