import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './style';

import {useAction} from '../../../../../utils/utils';

import {
  getDataAddressList,
  postDataUpdateAddress,
  setResAddressUpdate,
} from '../../../../../redux/actions/MainUserAction';

import BackNavigation from '../../../../../components/NavigationBack';
import MainInput from '../../../../../components/MainInput';
import MainButton from '../../../../../components/MainButton';
import ModalPicker from '../../../../../components/ModalPicker';

import ArrowDown from '../../../../../assets/icons/svg-icons/ArrowDown';

const EditAddress = ({navigation}) => {
  const {asyncToken, allState} = useSelector(state => state.auth);

  const {infoOneAddress, resUpdate} = useSelector(state => state.main);

  const getDataAddressListFn = useAction(getDataAddressList);
  const postDataUpdateAddressFn = useAction(postDataUpdateAddress);
  const setResAddressUpdateFn = useAction(setResAddressUpdate);

  const [ident, setIdent] = useState(false);

  const [addressName, setAddressName] = useState(infoOneAddress?.data?.label);
  const [cityName, setCityName] = useState(infoOneAddress?.data?.city);
  const [streetName, setStreetName] = useState(infoOneAddress?.data?.street);
  const [appartmentName, setAppartmentName] = useState(
    infoOneAddress?.data?.apartment,
  );
  const [comment, setComment] = useState('');
  const [statePicker, setStatePicket] = useState(false);
  const [idStat, setIdStat] = useState();
  const [stateCountry, setStateCountry] = useState(
    infoOneAddress?.data?.State?.name,
  );

  useEffect(() => {
    setAddressName(infoOneAddress?.data?.label);
    setCityName(infoOneAddress?.data?.city);
    setStreetName(infoOneAddress?.data?.street);
    setAppartmentName(infoOneAddress?.data?.apartment);
    setStateCountry(infoOneAddress?.data?.State?.name);
  }, [infoOneAddress]);

  useEffect(() => {
    if (
      resUpdate.message === 'success' &&
      cityName?.length > 1 &&
      streetName?.length > 1 &&
      appartmentName?.length > 1 &&
      addressName?.length > 1
    ) {
      setIdent(false);
      getDataAddressListFn(asyncToken);
      navigation.navigate('MyAddresses');
      setResAddressUpdateFn({});
    }
  }, [resUpdate.message]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.safeArea} contentContainerStyle={{flexGrow: 1}}>
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
                  value={addressName}
                  onChangeText={e => setAddressName(e)}
                  label="Address name"
                  placeholder="Address name"
                  maxLength={100}
                />
              </View>
              {addressName?.length < 1 && ident && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorInput}>
                    Address name field name not be empty
                  </Text>
                </View>
              )}
              <View style={styles.inputcontainer}>
                <MainInput
                  value={cityName}
                  onChangeText={e => setCityName(e)}
                  label="City"
                  placeholder="City"
                  maxLength={100}
                />
              </View>
              {cityName?.length < 1 && ident && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorInput}>
                    City field name not be empty
                  </Text>
                </View>
              )}
              <View style={styles.inputcontainer}>
                <MainInput
                  value={streetName}
                  onChangeText={e => setStreetName(e)}
                  label="Street name"
                  placeholder="Street name"
                  maxLength={100}
                />
              </View>
              {streetName?.length < 1 && ident && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorInput}>
                    Street name field name not be empty
                  </Text>
                </View>
              )}
              <View style={styles.inputcontainer}>
                <MainInput
                  value={appartmentName}
                  onChangeText={e => setAppartmentName(e)}
                  label="Appartment"
                  placeholder="Appartment"
                  maxLength={100}
                />
              </View>
              {appartmentName?.length < 1 && ident && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorInput}>
                    Appartment field not be empty
                  </Text>
                </View>
              )}
              <View style={styles.inputcontainer}>
                <MainInput
                  value={comment}
                  onChangeText={e => setComment(e)}
                  label="Comment"
                  placeholder="Comment"
                  heightTrack={true}
                  maxLength={100}
                />
              </View>
            </View>
            {resUpdate.message ? (
              <View style={styles.generalError}>
                <Text style={styles.errorInputGeneral}>
                  {resUpdate.message}
                </Text>
              </View>
            ) : null}
            <View style={styles.buttonContainer}>
              <MainButton
                onPress={async () => {
                  cityName.length < 1 ||
                  streetName.length < 1 ||
                  appartmentName.length < 1 ||
                  addressName.length < 1
                    ? setIdent(true)
                    : setIdent(false);
                  await postDataUpdateAddressFn(
                    {
                      id: infoOneAddress.data.id,
                      stateId: idStat,
                      label: addressName,
                      city: cityName,
                      street: streetName,
                      apartment: appartmentName,
                      description: comment,
                    },
                    asyncToken,
                  );
                }}
                buttonText="Save changes"
              />
            </View>
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
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditAddress;
