import {StyleSheet, Platform} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  navigationContainer: {
    height: 25,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  navigationButton: {
    height: 25,
    width: '10%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  navigationTextContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationTitle: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
    textAlign: 'center',
    color: colors.textDarkGrey,
  },
  editText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
    textAlign: 'center',
    color: colors.textDarkGrey,
  },
});

export default styles;
