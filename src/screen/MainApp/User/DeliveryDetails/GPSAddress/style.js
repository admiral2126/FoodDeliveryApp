import {StyleSheet} from 'react-native';
import colors from '../../../../../assets/colors/colors';

const styles = StyleSheet.create({
  adressWithMapContainer: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
  },
  mapStyle: {
    flex: 1,
  },
  containerBackButton: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    marginHorizontal: 16,
    top: 30,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  containerButtonOnMap: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginHorizontal: 16,
  },
  arrowContainer: {
    height: 25,
    width: 25,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
