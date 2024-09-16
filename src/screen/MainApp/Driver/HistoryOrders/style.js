import {StyleSheet} from 'react-native';

import colors from '../../../../assets/colors/colors';

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
  totalForDay: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTotalText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 30,
  },
  titleTotalNumber: {
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 26,
  },
  oneOrderCardContainer: {
    height: 210,
    width: '100%',
    marginTop: 15,
  },
  headerOrderCard: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderNumber: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
  statusOrderButton: {
    height: 30,
    minWidth: 46,
    borderRadius: 50,
    backgroundColor: colors.borderGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    padding: 5,
  },
  statusButtonText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 18,
  },
  restrauntListContainer: {
    minHeight: 30,
    width: '100%',
  },
  restrauntText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19.6,
    marginTop: 8,
  },
  timeAndIncomeContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    marginTop: 12,
  },
  timeContainer: {
    width: '60%',
    height: '100%',
  },
  incomeContainer: {
    width: '40%',
    height: '100%',
  },
  headerText: {
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 18,
  },
  contentText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19.6,
    marginTop: 3,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
  },
});

export default styles;
