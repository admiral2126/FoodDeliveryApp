import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  itemRateContainer: {
    height: 160,
    width: '100%',
    marginTop: 24,
  },
  headerItemRateContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImageContainer: {
    height: 60,
    width: 60,
    backgroundColor: colors.borderGrey,
    borderRadius: 16,
  },
  itemInfoContainer: {
    height: '77%',
    width: '80%',
    marginLeft: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemNameText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.5,
  },
  restrauntNameText: {
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19.6,
  },
});

export default styles;
