import {StyleSheet} from 'react-native';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backAddress,
    marginHorizontal: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.backAddress,
  },
  flatListStyle: {
    flex: 1,
    backgroundColor: colors.backAddress,
  },
  noneContainer: {
    flex: 1,
    alignItems: 'center',
    top: '25%',
  },
  noneText: {
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 24,
  },
  orderContainer: {
    backgroundColor: colors.backAddress,
    minHeight: 210,
    width: '96%',
    marginTop: 24,
  },
  headerContainer: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContentContainer: {
    height: 40,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberCodeStyle: {
    color: colors.textDarkGrey,
    marginRight: 16,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22.5,
    textAlign: 'center',
  },
  statusText: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  statusContainerElem: {
    height: 30,
    minWidth: 68,
    backgroundColor: colors.borderGrey,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingHorizontal: 10,
  },
  contentDetailContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  borderBottom: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    marginTop: 3,
  },
  contentStyleText: {
    color: colors.textLightBrown,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default styles;
