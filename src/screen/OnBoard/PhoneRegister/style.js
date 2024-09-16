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
  viewPhoneInput: {
    width: '100%',
    height: 75,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 16,
  },
  textContainerStyles: {
    borderTopEndRadius: 16,
    borderBottomEndRadius: 16,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: colors.borderGrey,
    margin: 10,
  },
  inputElement: {
    height: 40,
    marginTop: 7,
  },
  containerButton: {
    height: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  errorContainer: {
    width: '100%',
    alignItems: 'center',
    marginLeft: 20,
  },
  errorInput: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
    marginTop: 10,
  },
  validContainer: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validText: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
    marginTop: 10,
  },
  serviceTextContainer: {
    height: 50,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  servicesText: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: colors.textLightBrown,
  },
  linkText: {
    color: colors.buttonBackGroundColor,
    textDecorationLine: 'underline',
  },
});

export default styles;
