import {StyleSheet, Platform} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  mainModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: -25,
  },
  containerContentOrder: {
    height: 650,
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
});

export default styles;
