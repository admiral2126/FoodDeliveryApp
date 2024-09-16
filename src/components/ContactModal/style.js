import {StyleSheet, Platform} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  mainModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: -25,
    backgroundColor: 'rgba(51, 55, 63, 0.3);',
  },
  containerContentOrder: {
    height: 345,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  headerCodeOrder: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 23,
    lineHeight: 27,
  },
  buttonContainer: {
    height: 64,
    width: '100%',
    backgroundColor: colors.backAddress,
    borderRadius: 16,
    marginTop: 16,
    padding: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInButton: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
  },
});

export default styles;
