import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
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
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
    marginTop: 10,
  },
  containerButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
    height: 50,
    width: '100%',
    backgroundColor: colors.buttonBackGroundColor,
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
    fontSize: 19,
    lineHeight: 24,
  },
  textCancelStyle: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 19,
  },
  headerInfo: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 26,
  },
  mainInfoText: {
    height: 135,
    width: '100%',
    justifyContent: 'center',
  },
});

export default styles;
