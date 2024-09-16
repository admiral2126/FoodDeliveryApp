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
  },
  headerTextModal: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 27,
  },
  buttonCancel: {
    height: 54,
    width: '100%',
    borderRadius: 16,
    backgroundColor: colors.buttonBackGroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 8,
  },
  leaveButton: {
    height: 54,
    width: '100%',
    borderRadius: 16,
    backgroundColor: colors.borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveText: {
    color: colors.white,
    fontFamily: 'Manrope-Bold',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 26.5,
  },
  leaveText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-Bold',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 26.5,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
