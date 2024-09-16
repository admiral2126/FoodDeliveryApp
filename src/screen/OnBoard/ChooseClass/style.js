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
  buttonBlockContainer: {
    height: 260,
    justifyContent: 'space-between',
  },
});

export default styles;
