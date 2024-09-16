import {StyleSheet} from 'react-native';

import colors from '../../../../../assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
    marginHorizontal: 16,
    marginTop: 3,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
  },
  mainContentContainer: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
  },
  headerRestrauntContainer: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftHeaderText: {
    height: '100%',
    width: '60%',
    justifyContent: 'space-between',
  },
  restrauntNameText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 30,
  },
  locationText: {
    color: colors.backGroundBrown,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19.6,
  },
  phoneButtonContainer: {
    height: 50,
    width: 50,
    borderRadius: 12,
    backgroundColor: colors.borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '100%',
  },
  infoText: {
    color: colors.backGroundBrown,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19.6,
    marginLeft: 11,
  },
  itemListContainer: {
    width: '100%',
    minHeight: 30,
  },
  orderHeader: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 10,
  },
  menuItemContainer: {
    height: 115,
    width: '100%',
    marginBottom: 25,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  menuItemImage: {
    height: 112,
    width: 112,
    backgroundColor: colors.borderGrey,
    borderRadius: 16,
  },
  detailInfoContainer: {
    height: '80%',
    width: '100%',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  nameItemText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
  otherTextStyle: {
    width: '65%',
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContiner: {
    marginTop: 25,
    marginBottom: 25,
  },
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
