import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './style';

import {useAction} from '../../../../../utils/utils';

import {
  setAddressAppartment,
  setAddressComment,
  postDataAddressGeneral,
  setResAddDeliverAddress,
  setAddressLabel,
  getDataAddressList,
} from '../../../../../redux/actions/MainUserAction';

import {
  setGeoInfo,
  setNavigationRouteAddress,
} from '../../../../../redux/actions/MainDriverAction';

import BackNavigation from '../../../../../components/NavigationBack';
import MainInput from '../../../../../components/MainInput';
import MainButton from '../../../../../components/MainButton';
import ModalDriverInfo from '../../../../../components/ModalInfoDriver';
import ModalPicker from '../../../../../components/ModalPicker';

import ArrowDown from '../../../../../assets/icons/svg-icons/ArrowDown';

const AddNewGeneralAddress = ({navigation}) => {
  const {asyncToken, allState} = useSelector(state => state.auth);

  const {
    addressLabel,
    addressAppartment,
    addressComment,
    resAddDeliveryAddress,
  } = useSelector(state => state.main);

  const {geoInfo, routeAddress} = useSelector(state => state.driver);

  const setGeoInfoFn = useAction(setGeoInfo);

  const setAddressAppartmentFn = useAction(setAddressAppartment);
  const setAddressCommentFn = useAction(setAddressComment);
  const postDataAddressGeneralFn = useAction(postDataAddressGeneral);
  const setResAddDeliverAddressFn = useAction(setResAddDeliverAddress);
  const setAddressLabelFn = useAction(setAddressLabel);
  const getDataAddressListFn = useAction(getDataAddressList);

  const setNavigationRouteAddressFn = useAction(setNavigationRouteAddress);

  const [ident, setIdent] = useState(false);
  const [modal, setModal] = useState(false);
  const [statePicker, setStatePicket] = useState(false);
  const [idStat, setIdStat] = useState();

  const [cityState, setCityState] = useState(
    geoInfo?.data?.address?.town
      ? geoInfo?.data?.address?.town
      : geoInfo?.data?.address?.city,
  );
  const [streetState, setStreetState] = useState(geoInfo?.data?.address?.road);

  const [stateCountry, setStateCountry] = useState();

  useEffect(() => {
    setCityState(
      geoInfo?.data?.address?.town
        ? geoInfo?.data?.address?.town
        : geoInfo?.data?.address?.city,
    );
    setStreetState(geoInfo?.data?.address?.road);
  }, [geoInfo]);

  useEffect(() => {
    if (resAddDeliveryAddress.message === 'success') {
      setTimeout(() => {
        if (routeAddress) {
          navigation.navigate('MainScreen');
          setNavigationRouteAddressFn(false);
        } else {
          navigation.navigate('MyAddresses');
        }
      }, 0);
      setIdent(false);
      getDataAddressListFn(asyncToken);
      setGeoInfoFn({});
      // setCityState('');
      // setStreetState('');
      setAddressAppartmentFn('');
      setAddressCommentFn('');
      setAddressLabelFn('');
      setResAddDeliverAddressFn('');
    }
  }, [resAddDeliveryAddress.message]);

  useEffect(() => {
    if (geoInfo.message === 'success') {
      setModal(true);
    }
  }, [geoInfo]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        style={styles.safeArea}
        onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <BackNavigation
            navigationTitle="Address details"
            navigatePress={() => {
              navigation.goBack();
              setIdent(false);
              setCityState('');
              setStreetState('');
              setAddressAppartmentFn('');
              setAddressCommentFn('');
              setResAddDeliverAddressFn('');
              setAddressLabelFn('');
            }}
          />
          <View style={styles.allInputContainer}>
            <View style={styles.containerInput}>
              <View style={styles.containerBirthDate}>
                <MainInput
                  value={stateCountry}
                  label="State"
                  placeholder="State"
                  editable={false}
                />
                <TouchableOpacity
                  style={[styles.iconContainer]}
                  onPress={() => {
                    setIdStat('');
                    setStatePicket(true);
                  }}>
                  <ArrowDown />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputcontainer}>
              <MainInput
                value={addressLabel}
                onChangeText={e => setAddressLabelFn(e)}
                label="Address name"
                placeholder="Address name"
                maxLength={100}
              />
            </View>
            {addressLabel.length < 1 && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Address name field name not be empty
                </Text>
              </View>
            )}
            <View style={styles.inputcontainer}>
              <MainInput
                value={cityState}
                onChangeText={e => setCityState(e)}
                label="City"
                placeholder="City"
                maxLength={100}
              />
            </View>
            {cityState?.length < 1 && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  City field name not be empty
                </Text>
              </View>
            )}
            <View style={styles.inputcontainer}>
              <MainInput
                value={streetState}
                onChangeText={e => setStreetState(e)}
                label="Street name"
                placeholder="Street name"
                maxLength={100}
              />
            </View>
            {streetState?.length < 1 && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Street name field name not be empty
                </Text>
              </View>
            )}
            <View style={styles.inputcontainer}>
              <MainInput
                value={addressAppartment}
                onChangeText={e => setAddressAppartmentFn(e)}
                label="Apartment"
                placeholder="Apartment"
                maxLength={100}
              />
            </View>
            {addressAppartment.length < 1 && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Appartment field not be empty
                </Text>
              </View>
            )}
            <View style={styles.inputcontainer}>
              <MainInput
                value={addressComment}
                onChangeText={e => setAddressCommentFn(e)}
                label="Comment"
                placeholder="Comment"
                heightTrack
                maxLength={100}
                numberOfLines={3}
              />
            </View>
          </View>
          {resAddDeliveryAddress.message ? (
            <View style={styles.generalError}>
              <Text style={styles.errorInputGeneral}>
                {resAddDeliveryAddress.message}
              </Text>
            </View>
          ) : null}
          <View style={styles.buttonContainer}>
            <MainButton
              onPress={async () => {
                cityState.length < 1 ||
                streetState.length < 1 ||
                addressAppartment.length < 1 ||
                addressLabel.length < 1
                  ? setIdent(true)
                  : setIdent(false);
                await postDataAddressGeneralFn(
                  {
                    label: addressLabel,
                    stateId: idStat,
                    city: cityState,
                    street: streetState,
                    apartment: addressAppartment,
                    description: addressComment,
                    isOneTimeAddress: false,
                  },
                  asyncToken,
                );
              }}
              buttonText="Add"
            />
          </View>
          <ModalDriverInfo
            visible={modal}
            pressOkey={() => setModal(false)}
            message="We filled the city and the street with your GPS data"
          />
          {allState.length ? (
            <ModalPicker
              scroll={true}
              visible={statePicker}
              content={() => {
                return (
                  <>
                    {allState?.map((item, index) => (
                      <TouchableOpacity
                        key={index + 1}
                        onPress={() => {
                          setStatePicket(false);
                          // clearAllCity('');
                          // setStateCity('');
                          // setIdCity('');
                          // setId(item.id);
                          setIdStat(item.id);
                          setStateCountry(item.name);
                        }}
                        style={[styles.elementTouch]}>
                        <Text style={styles.elementStyle}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                );
              }}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddNewGeneralAddress;
