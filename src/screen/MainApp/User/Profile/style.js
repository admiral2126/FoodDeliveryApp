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
  containerProfileLine: {
    height: 40,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  titleLine: {
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 18,
  },
  subTitleLine: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
});

export default styles;
