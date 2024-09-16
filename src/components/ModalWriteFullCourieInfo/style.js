import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  modalApproveContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveContainer: {
    backgroundColor: colors.white,
    width: '70%',
    height: 290,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
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
  containerButton: {
    width: '100%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  buttonStyleSwap: {
    height: 40,
    width: '100%',
    backgroundColor: colors.buttonBackGroundColor,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonStyleSkip: {
    height: 40,
    width: '100%',
    backgroundColor: '#154A86',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInButton: {
    color: colors.white,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
  },
  textCancelStyle: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
  },
});

export default styles;
