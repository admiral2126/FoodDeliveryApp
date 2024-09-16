import {StyleSheet} from 'react-native';
import colors from '../../../../../assets/colors/colors';

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
  allInputContainer: {
    minHeight: 360,
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  errorContainer: {
    marginLeft: 20,
  },
  generalError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorInputGeneral: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 19,
  },
  errorInput: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
  },
  inputcontainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  containerInput: {
    marginBottom: 5,
    marginTop: 10,
  },
  containerBirthDate: {
    width: '100%',
    height: 64,
  },
  iconContainer: {
    position: 'absolute',
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    right: 23,
    top: '50%',
    transform: [{translateY: -12.5}],
  },
  elementTouch: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    borderColor: colors.backGroundMainColor,
    borderBottomWidth: 1,
  },
  elementStyle: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
});

export default styles;
