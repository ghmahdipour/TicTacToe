import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Font from "../../../constants/fonts";
import Colors from "../../../constants/colors";

export default StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(2),
        width: '80%'
    },
    text: {
        paddingTop: hp(2)
    },
    btnText: {
        fontSize: Font.font_18,
        color: Colors.primaryText
    },
})