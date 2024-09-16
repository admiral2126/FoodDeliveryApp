import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  mainModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: -25,
  },
  containerContentOrder: {
    height: 360,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 25.35,
    elevation: 19,
  },
  headerCodeOrder: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 23,
    lineHeight: 27,
    paddingTop: 10,
  },
  restrauntItemStyle: {
    marginTop: 8,
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
  },
  distanceText: {
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
  },
  borderLine: {
    marginTop: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
  },
  timeAndIncomeContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
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
});

export default styles;
