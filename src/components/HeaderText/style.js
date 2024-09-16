import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  headerTextContainer: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38,
    color: colors.textDarkGrey,
    textAlign: 'center',
  },
  subTitleText: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22.5,
    color: colors.textDarkGrey,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default styles;
