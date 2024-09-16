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
  notificationListItem: {
    height: 40,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  borderBottom: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    marginBottom: 16,
  },
});

export default styles;
