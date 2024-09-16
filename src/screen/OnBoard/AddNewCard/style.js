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
  headerTextContainer: {
    height: 60,
    width: '100%',
  },
  headerTextStyle: {
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 38.5,
    color: colors.textDarkGrey,
  },
  inputcontainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  mainInputContainer: {
    minHeight: 145,
    width: '100%',
    justifyContent: 'space-between',
  },
  rowInputContainer: {
    minHeight: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  switchButtonContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textNearSwithc: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
    color: colors.textDarkGrey,
    marginLeft: 16,
  },
  errorContainer: {
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  errorInput: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
  },
});

export default styles;
