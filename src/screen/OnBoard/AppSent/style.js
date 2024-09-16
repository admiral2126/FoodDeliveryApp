import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';

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
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    width: '100%',
  },
  containerIcon: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: colors.borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: 140,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 38.5,
    textAlign: 'center',
  },
  subTitleText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});

export default styles;
