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
  underLocateText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 30,
    marginTop: 25,
    marginBottom: 20,
  },
  emptyAddressContainer: {
    top: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAddressContainer: {
    height: 64,
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.borderGrey,
    marginBottom: 25,
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
  listAddressContainer: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
    alignItems: 'center',
  },
  addressItemContainer: {
    height: 80,
    width: '100%',
    borderRadius: 16,
    padding: 17,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoAddressContainer: {
    height: '100%',
    width: '80%',
    justifyContent: 'space-between',
  },
  headerAddressText: {
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
    color: colors.textDarkGrey,
  },
  subHeaderAddressText: {
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textDarkGrey,
  },
});

export default styles;
