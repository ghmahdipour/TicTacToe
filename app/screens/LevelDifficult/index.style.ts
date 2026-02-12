import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Font from "../../constants/fonts";
import Colors from "../../constants/colors";

export default StyleSheet.create({
    // imageContainer: {
    //     width: wp(50),
    //     height: wp(50),
    //     flex: .3,
    //     marginVertical: hp(7),
    //     alignSelf: 'center',
    //     resizeMode: 'contain',
    // },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        marginVertical: hp(5)
    },
    text: {
        fontSize: Font.font_42,
        color: Colors.red
    },
    buttons: {
        flexDirection: 'column'
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: hp(1),
        marginVertical: hp(1),
        paddingHorizontal: wp(5),
        borderRadius: wp(5)
    },
    btnText: {
        fontSize: Font.font_22,
        color: Colors.primaryText,
        marginLeft: wp(4)
    },
    image: {
        width: wp(11),
        height: wp(11)
    },
    title: {
        fontSize: Font.font_42,
        color: Colors.red
    }

})