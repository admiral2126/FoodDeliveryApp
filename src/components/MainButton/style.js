import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  mainButtonContainer: {
    width: '100%',
    height: 64,
    backgroundColor: colors.buttonBackGroundColor,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
    color: colors.white,
    textAlign: 'center',
  },
});

export default styles;
