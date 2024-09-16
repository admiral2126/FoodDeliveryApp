import {StyleSheet} from 'react-native';
import colors from '../../../../../assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
    marginHorizontal: 16,
    marginBottom: 40,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.backGroundMainColor,
  },
  containerTextStatus: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 15,
  },
  statusTextStyle: {
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  mapContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  },
  containerMap: {
    height: '74%',
    width: '99%',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  mapStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  customerContainer: {
    height: 80,
    width: '100%',
    borderRadius: 16,
    marginTop: 16,
    padding: 20,
    backgroundColor: colors.white,
  },
  timeText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
  },
  courierName: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
  },
  underNameText: {
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
  },
  mapStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
    marginHorizontal: 16,
  },
});

export default styles;
