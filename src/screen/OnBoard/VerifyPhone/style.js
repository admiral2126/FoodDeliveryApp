import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
    marginHorizontal: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
  },
  validContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validText: {
    color: 'red',
    fontFamily: 'Manrope',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
  },
  otpContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  otpMainStyle: {
    width: '80%',
    height: 100,
  },
  underlineStyleBase: {
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 22,
    textAlign: 'center',
    fontStyle: 'normal',
    // width: 56,
    // height: 64,
    borderWidth: 0,
    borderRadius: 16,
    borderColor: colors.borderGrey,
  },
  reSendContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  reSendText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
    textAlign: 'center',
    color: colors.textLightBrown,
    marginLeft: 12,
  },
});

export default styles;
