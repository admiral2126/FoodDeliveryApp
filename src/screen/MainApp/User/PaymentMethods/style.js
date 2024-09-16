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
  allPaymentContainer: {
    minHeight: 85,
    width: '100%',
    justifyContent: 'space-between',
  },
  leftContainerPayment: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainerPayment: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    height: 90,
    width: '100%',
  },
  innerTextCon: {
    height: '75%',
    width: '100%',
    justifyContent: 'space-between',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorInput: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 19,
  },
  addAddressContainer: {
    height: 64,
    width: '100%',
    backgroundColor: colors.backGroundMainColor,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.borderGrey,
    marginTop: 16,
    marginBottom: 20,
  },
  contentAddContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButtonAdd: {
    marginLeft: 11,
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 20.5,
    color: colors.textDarkGrey,
  },
});

export default styles;
