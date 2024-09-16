import {StyleSheet} from 'react-native';
import colors from '../../../../../assets/colors/colors';

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
  allPaymentContainer: {
    minHeight: 85,
    width: '100%',
    marginTop: 15,
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  leftContainerPayment: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteContainerPayment: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  mainHeaderContainer: {
    height: 90,
    width: '100%',
    justifyContent: 'space-between',
  },
  headerContainer: {
    height: '80%',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textHeaderModal: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 38.4,
    color: colors.textDarkGrey,
  },
  subHeaderText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
    color: colors.textDarkGrey,
  },
  paymentContainerModal: {
    width: '100%',
    height: 64,
    backgroundColor: colors.white,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 16,
  },
  textStylePay: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
    color: colors.textDarkGrey,
  },
});

export default styles;
