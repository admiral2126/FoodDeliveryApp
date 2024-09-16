import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  containerMenuItem: {
    height: 220,
    width: 166,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: '50%',
  },
  imageContainer: {
    height: 114,
    width: '100%',
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
  },
  touchImage: {
    height: 114,
    width: '100%',
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: colors.borderGrey,
  },
  containerLike: {
    padding: 8,
    right: 0,
    position: 'absolute',
  },
  menuItemImage: {
    width: '100%',
    height: '100%',
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
  },
  bottomContainer: {
    height: 106,
    width: '100%',
    backgroundColor: colors.white,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 134,
    height: 44,
    backgroundColor: colors.buttonBackGroundColor,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
  textInButton: {
    color: colors.white,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
  favoritsButtonContainer: {
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButtonContainer: {
    height: 44,
    width: 134,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonSec: {
    width: 44,
    height: 44,
    backgroundColor: colors.buttonBackGroundColor,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
