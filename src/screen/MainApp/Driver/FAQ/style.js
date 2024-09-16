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
  faqContainer: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
  },
  titleFaqText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 38.5,
  },
});

export default styles;
