import {StyleSheet} from 'react-native';

import colors from '../../../../assets/colors/colors';

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
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  totalAmountContainer: {
    height: 160,
    width: '100%',
    backgroundColor: colors.textDarkGrey,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberAmountContainer: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberStyle: {
    color: colors.borderGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 48,
    lineHeight: 57.6,
  },
  textUnderNum: {
    color: colors.borderGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19.6,
  },
  contentInputContainer: {
    height: 120,
    width: '100%',
    marginTop: 30,
  },
  titleText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 16,
  },
});

export default styles;
