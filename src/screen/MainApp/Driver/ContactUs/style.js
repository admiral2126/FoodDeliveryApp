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
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 15,
  },
  headerText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
  },
  textInput: {
    minHeight: 108,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginTop: 24,
    padding: 20,
    paddingTop: 20,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22.4,
    textAlignVertical: 'top',
  },
  addAddressContainer: {
    height: 64,
    width: '100%',
    backgroundColor: colors.backGroundMainColor,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.borderGrey,
    marginTop: 16,
    marginBottom: 20,
  },
  contentAddContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButtonAdd: {
    marginLeft: 11,
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 20.5,
    color: colors.textDarkGrey,
  },
  smallPlusButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 5,
  },
  mainContainerWithImage: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 20,
  },
  imageAddContainer: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {width: 60, height: 60, borderRadius: 10},
  cancelPhotoButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  errorContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  errorInput: {
    color: colors.buttonBackGroundColor,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
  },
});

export default styles;
