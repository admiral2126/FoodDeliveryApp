import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  cartActive: {
    width: 14,
    height: 14,
    borderRadius: 50,
    backgroundColor: colors.pinkText,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
  textNumberItemInCart: {
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 8,
    lineHeight: 11.2,
    textAlign: 'center',
    color: colors.white,
  },
});

export default styles;
