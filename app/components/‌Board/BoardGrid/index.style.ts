import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    boardMainWrapper: {
        backgroundColor: 'rgba(121, 125, 127,.25)',
        flex: 1,
        margin: wp(.5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        borderRadius: 8
    }
})
