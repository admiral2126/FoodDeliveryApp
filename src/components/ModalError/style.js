import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideContainer: {
    backgroundColor: colors.white,
    width: '75%',
    height: 290,
    borderRadius: 24,
    padding: 40,
    justifyContent: 'space-around',
  },
  headerTextModal: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 26,
  },
  headerDescriptionModal: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  button: {
    height: 64,
    width: '100%',
    borderRadius: 16,
    backgroundColor: colors.buttonBackGroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22.5,
  },
});

export default styles;
