import {StyleSheet} from 'react-native';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backAddress,
    marginHorizontal: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.backAddress,
  },
  skipContainer: {
    height: 30,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 15,
  },
  skipNavContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  titleText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 30,
  },
  subTitleText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 30,
  },
  itemNameText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
  restrauntNameText: {
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19.6,
  },
});

export default styles;
