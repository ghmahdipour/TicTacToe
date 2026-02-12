import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Font from "../../constants/fonts";
import Colors from "../../constants/colors";

export default StyleSheet.create({
    header: {
        paddingTop: hp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(1.5)
    },
    mainContent:{
        justifyContent: 'space-between', 
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: wp('90%')
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: wp(10)
    },
    btnBox: {
        backgroundColor: Colors.primary, 
        width: wp(20), 
        padding: wp(3), 
        alignItems: 'center',
        borderRadius: wp(4)
    },
    winText: {
        fontSize: Font.font_42,
        color: Colors.warning,
        marginLeft: wp(3)
    },
    resultBox: {
        flex: .8, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    resultContent : {
        flexDirection: 'row', 
        alignItems:'center',
        justifyContent: 'center'
    },
    resetIcon: {
        width: wp(10),
        height: wp(10)
    }
})
