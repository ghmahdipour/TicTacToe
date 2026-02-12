import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Font from "../../constants/fonts";
import Colors from "../../constants/colors";

export default StyleSheet.create({
    container: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        justifyContent: 'center',
        marginVertical: hp(4)
    },
    text: {
        fontSize: Font.font_42,
        color: Colors.red
    },
    github: {
        width: wp(10),
        height: wp(10)
    },
    musicIcon: {
        width: wp(8),
        height: wp(8)
    },
    buttons: {
        flexDirection: 'column'
    },
    image: {
        width: wp(11),
        height: wp(11)
    },
    btnText: {
        fontSize: Font.font_22,
        color: Colors.primaryText
    },
    btnBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: hp(2)
    },
    extraBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    animationBox: {
        width: '100%',
        height: '100%',
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'
    }
})