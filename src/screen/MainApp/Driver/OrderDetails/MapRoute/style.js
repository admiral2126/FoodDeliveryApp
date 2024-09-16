import {StyleSheet} from 'react-native';

import colors from '../../../../../assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
    marginHorizontal: 16,
    marginTop: 3,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
  },
  containerMap: {
    height: '87%',
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
    marginHorizontal: 16,
  },
});

export default styles;
