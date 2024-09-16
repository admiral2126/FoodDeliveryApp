import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  modalCancelContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelContainer: {
    backgroundColor: colors.white,
    width: '75%',
    height: 290,
    borderRadius: 24,
    padding: 40,
    justifyContent: 'space-between',
  },
  headerTextModal: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
  },
  buttonCancel: {
    height: 64,
    width: '100%',
    borderRadius: 16,
    backgroundColor: colors.buttonBackGroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  leaveButton: {
    height: 64,
    width: '100%',
    borderRadius: 16,
    backgroundColor: colors.borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: colors.white,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22.5,
  },
  leaveText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22.5,
  },
});

export default styles;
