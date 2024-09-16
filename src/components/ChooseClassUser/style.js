import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  buttonContainer: {
    height: 122,
    width: '100%',
    backgroundColor: colors.buttonBackGroundColor,
    borderRadius: 24,
    padding: 24,
  },
  textArrowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 30,
    color: colors.white,
  },
  subTitleContainer: {
    width: '100%',
  },
  subTitleText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: colors.white,
  },
});

export default styles;
