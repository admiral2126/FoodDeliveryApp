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
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  allPaymentContainer: {
    minHeight: 135,
    width: '100%',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  leftContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  paymentContainer: {
    width: '100%',
    height: 64,
    backgroundColor: colors.white,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
  },
  textStyle: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
    color: colors.textDarkGrey,
  },
});

export default styles;
