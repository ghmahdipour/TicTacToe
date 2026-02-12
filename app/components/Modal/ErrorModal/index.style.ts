import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Font from '../../../constants/fonts';
import Colors from '../../../constants/colors';

export default StyleSheet.create({
    text: {
        color: Colors.white
    },
    message: {
        fontSize: Font.font_16,
        marginVertical: hp(2),
    },
    btn: {
        backgroundColor: Colors.red
    }
})