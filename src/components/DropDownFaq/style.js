import {StyleSheet, Platform} from 'react-native';

import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  viewDropDownView: {
    minHeight: 30,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  headerDrop: {
    minHeight: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  textLeftContainer: {
    width: '90%',
    minHeight: 20,
  },
  rightContainerArrow: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openViewText: {
    minHeight: 30,
    width: '100%',
  },
  textHeader: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
  },
  textOpenDrop: {
    color: colors.textDarkGrey,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
    marginTop: 15,
  },
});

export default styles;
