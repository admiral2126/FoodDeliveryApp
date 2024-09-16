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
  postDataAddressDetails,
  postDataDeliveryAddress,
  setFullAddAddress,
  setResOneTimeAddress,
} from '../../../../../redux/actions/MainUserAction';

import {setGeoInfo} from '../../../../../redux/actions/MainDriverAction';

import ArrowDown from '../../../../../assets/icons/svg-icons/ArrowDown';

import BackNavigation from '../../../../../components/NavigationBack';
import MainInput from '../../../../../components/MainInput';
import MainButton from '../../../../../components/MainButton';

import ModalDriverInfo from '../../../../../components/ModalInfoDriver';
import ModalPicker from '../../../../../components/ModalPicker';

const AddressDeliveryDetails = ({navigation}) => {
  const {asyncToken, allState} = useSelector(state => state.auth);

  const {
    addressAppartment,
    addressComment,
    resProceedOrder,
    resOneTimeAddress,
    resConfirm,
  } = useSelector(state => state.main);

  const {geoInfo} = useSelector(state => state.driver);

  const setGeoInfoFn = useAction(setGeoInfo);

  const setAddressAppartmentFn = useAction(setAddressAppartment);
  const setAddressCommentFn = useAction(setAddressComment);
  const postDataAddressDetailsFn = useAction(postDataAddressDetails);
  const postDataDeliveryAddressFn = useAction(postDataDeliveryAddress);
  const setFullAddAddressFn = useAction(setFullAddAddress);
  const setResOneTimeAddressFn = useAction(setResOneTimeAddress);

  const [ident, setIdent] = useState(false);
  const [modal, setModal] = useState(false);
  const [stateCountry, setStateCountry] = useState();
  const [statePicker, setStatePicket] = useState(false);
  const [idStat, setIdStat] = useState();
  const [cityState, setCityState] = useState(
    geoInfo?.data?.address?.town
      ? geoInfo?.data?.address?.town
      : geoInfo?.data?.address?.city,
  );
  const [streetState, setStreetState] = useState(geoInfo?.data?.address?.road);

  useEffect(() => {
    if (resConfirm === 'order has been confirmed successfully') {
      setStateCountry('');
      setCityState('');
      setStreetState('');
      setIdStat('');
      setAddressAppartmentFn('');
      setAddressCommentFn('');
      setResOneTimeAddressFn({});
    }
  }, [resConfirm]);

  useEffect(() => {
    setCityState(
      geoInfo?.data?.address?.town
        ? geoInfo?.data?.address?.town
        : geoInfo?.data?.address?.city,
    );
    setStreetState(geoInfo?.data?.address?.road);
  }, []);

  useEffect(() => {
    if (resOneTimeAddress.message === 'success') {
      postDataDeliveryAddressFn(
        {
          id: resProceedOrder.data.id,
          deliveryAddressId: resOneTimeAddress.data.id,
        },
        asyncToken,
      );
    }
  }, [resOneTimeAddress]);

  useEffect(() => {
    if (geoInfo.message === 'success' && !idStat) {
      setModal(true);
    }
  }, [geoInfo]);

  useEffect(() => {
    if (
      resOneTimeAddress.message === 'success' &&
      resOneTimeAddress.length !== 0
    ) {
      navigation.navigate('DeliveryDetails');
      setIdent(false);
      setGeoInfoFn({});
      setAddressAppartmentFn('');
      setAddressCommentFn('');
      setResOneTimeAddressFn({});
    }
  }, [resOneTimeAddress]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        style={styles.safeArea}
        onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <BackNavigation
            navigationTitle="Address details"
            navigatePress={() => navigation.navigate('DeliveryDetails')}
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
                value={cityState}
                onChangeText={e => setCityState(e)}
                label="City"
                placeholder="City"
                maxLength={20}
              />
            </View>
            {cityState.length < 1 && ident && (
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
                maxLength={20}
              />
            </View>
            {streetState.length < 1 && ident && (
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
                maxLength={20}
              />
            </View>
            {addressAppartment.length < 1 && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Apartment field not be empty
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
          {resOneTimeAddress.message ? (
            <View style={styles.generalError}>
              <Text style={styles.errorInputGeneral}>
                {resOneTimeAddress.message}
              </Text>
            </View>
          ) : null}
          <View style={styles.buttonContainer}>
            <MainButton
              onPress={async () => {
                if (
                  cityState.length < 1 ||
                  streetState.length < 1 ||
                  addressAppartment.length < 1
                ) {
                  setIdent(true);
                }
                await postDataAddressDetailsFn(
                  {
                    city: cityState,
                    stateId: idStat,
                    street: streetState,
                    apartment: addressAppartment,
                    description: addressComment,
                    isOneTimeAddress: true,
                  },
                  asyncToken,
                );
                setFullAddAddressFn(
                  addressAppartment +
                    ',' +
                    ' ' +
                    cityState +
                    ',' +
                    ' ' +
                    streetState,
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

export default AddressDeliveryDetails;
