import {StyleSheet, Platform} from 'react-native';
import {color} from 'react-native-reanimated';
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
    width: '15%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  navigationTextContainer: {
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationEdit: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigationTitle: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: colors.textDarkGrey,
  },
  backText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
});

export default styles;
