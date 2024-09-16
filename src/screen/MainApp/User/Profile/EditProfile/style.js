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
  containerBirthDate: {
    width: '100%',
    height: 64,
  },
  iconView: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: -18,
    marginLeft: -20,
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
  viewSearch: {
    height: 45,
    width: '100%',
    backgroundColor: colors.borderGrey,
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
  },
  inputSearch: {
    color: colors.textDarkGrey,
    height: 40,
    width: '90%',
    marginLeft: 10,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
    marginTop: -6,
  },
  errorContainer: {
    marginLeft: 20,
  },
  errorInput: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
  },
  containerInput: {
    marginBottom: 5,
    marginTop: 10,
  },
});

export default styles;
