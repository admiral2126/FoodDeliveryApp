import {StyleSheet, Platform} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 15,
    paddingLeft: 20,
    width: '47.5%',
    height: 64,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  textInput: {
    height: 50,
    width: '100%',
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
    marginTop: Platform.OS === 'android' ? -5 : -8,
    color: colors.textDarkGrey,
  },
  iconView: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: -5,
    marginLeft: -20,
  },
  iconContainer: {
    position: 'absolute',
    height: 25,
    width: 25,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 22,
  },
});

export default styles;
