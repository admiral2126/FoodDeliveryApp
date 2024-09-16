import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import moment from 'moment';

import styles from './style';

import {useAction} from '../../../../../utils/utils';
import {
  postDataSignUpUpdate,
  getDataProfile,
  getDataAllState,
  getDataAllCity,
  setDateOfBirth,
  setIdState,
  setCityId,
  setAllState,
  setAllCity,
  setMessage,
  setResUpdate,
  setModalFullInfo,
} from '../../../../../redux/actions/AuthAction';

import DateIcon from '../../../../../assets/icons/svg-icons/DateIcon';
import ArrowDown from '../../../../../assets/icons/svg-icons/ArrowDown';

import HeaderProfile from '../../../../../components/HeaderProfile';
import MainInput from '../../../../../components/MainInput';
import ModalPicker from '../../../../../components/ModalPicker';
import SearchIcon from '../../../../../assets/icons/svg-icons/SearchIcon';

const EditProfile = ({navigation}) => {
  const {
    dateOfBirth,
    resProfile,
    resUpdate,
    asyncToken,
    asyncRole,
    allCity,
    allState,
    idCity,
    message,
    idState,
  } = useSelector(state => state.auth);
  const setDateOfBirthFn = useAction(setDateOfBirth);
  const postDataSignUpUpdateFn = useAction(postDataSignUpUpdate);
  const getDataProfileFn = useAction(getDataProfile);
  const getAllState = useAction(getDataAllState);
  const getAllCity = useAction(getDataAllCity);
  const setId = useAction(setIdState);
  const setIdCity = useAction(setCityId);
  const clearAllState = useAction(setAllState);
  const clearAllCity = useAction(setAllCity);
  const setMessageFn = useAction(setMessage);
  const setResUpdateFn = useAction(setResUpdate);
  const setModalFullInfoFn = useAction(setModalFullInfo);

  const profileData = resProfile?.data?.user;

  const [open, setOpen] = useState('');
  const date = new Date();

  useEffect(() => {
    profileData?.birthdayIso.split('T')[0] &&
      setDateOfBirthFn(new Date(profileData?.birthdayIso.split('T')[0]));
  }, [profileData?.birthdayIso]);

  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [cityDrop, setCityDrop] = useState(false);
  const [ident, setIdent] = useState(false);
  const [firstName, setFirstName] = useState(profileData?.firstName);
  const [lastName, setLastName] = useState(profileData?.lastName);
  const [dateBirth, setBirth] = useState(profileData?.birthdayIso);
  const [email, setEmail] = useState(profileData?.email);
  const [phone, setPhone] = useState(profileData?.phone);
  const [stateCountry, setStateCountry] = useState(profileData?.state);
  const [stateCity, setStateCity] = useState(profileData?.city);

  useEffect(() => {
    setFirstName(profileData?.firstName);
    setLastName(profileData?.lastName);
    setBirth(profileData?.birthdayIso.split('T')[0]);
    // setBirth(profileData?.birthdayIso);
    setEmail(profileData?.email);
    setPhone(profileData?.phone);
  }, [profileData]);

  useEffect(() => {
    if (asyncRole === 'courier') {
      clearAllState('');
      clearAllCity('');
      getAllState();
    }
  }, [asyncRole]);

  useEffect(() => {
    if (asyncRole === 'courier' && stateCountry) {
      getAllCity({id: idState});
    }
  }, [idState]);

  useEffect(() => {
    if (asyncRole === 'courier') {
      if (profileData?.stateId) {
        getAllCity({id: profileData.stateId});
      }
    }
  }, [profileData?.stateId]);

  useEffect(() => {
    if (resUpdate.success === true) {
      navigation.navigate('MainScreen');
      clearAllState('');
      clearAllCity('');
      setMessageFn('');
      setIdent(false);
      setDateOfBirthFn('');
      setResUpdateFn('');
      setTimeout(() => {
        getDataProfileFn();
      }, 500);
    }
  }, [resUpdate.success]);

  const formatDate = !dateOfBirth
    ? ''
    : dateOfBirth.toLocaleDateString('en-IN', {
        year: 'numeric',
        day: 'numeric',
        month: 'long',
      });
  // moment(dateOfBirth).format('D MMMM YYYY');

  const setDropList = () => {
    const inputValue = search.trim().toLocaleLowerCase();
    let rowLocation = [];

    if (allCity.length > 0) {
      rowLocation = allCity.filter(row => {
        return row.name.toLocaleLowerCase().match(inputValue);
      });
    }
    return (
      <>
        {rowLocation?.map((item, index) => (
          <TouchableOpacity
            key={index + 1}
            onPress={() => {
              setCityDrop(false);
              setIdCity(item.id);
              setStateCity(item.name);
              setSearch('');
            }}
            style={styles.elementTouch}>
            <Text style={styles.elementStyle}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        style={styles.mainContainer}
        onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <HeaderProfile
            navigationTitle="Profile"
            navigatePress={() => {
              if (
                asyncRole == 'courier' &&
                resProfile?.data?.user?.cityId === null &&
                resProfile?.data?.user?.stateId === null
              ) {
                setModalFullInfoFn(true);
              }
              navigation.goBack();
            }}
            button="Save"
            onPress={() => {
              if (
                asyncRole === 'client' &&
                firstName !== '' &&
                firstName.trim() !== '' &&
                lastName.trim() !== '' &&
                firstName.length >= 3 &&
                lastName.length >= 3 &&
                lastName !== '' &&
                email !== '' &&
                message !== 'user with email already exists'
              ) {
                postDataSignUpUpdateFn(
                  {
                    firstName: firstName,
                    lastName: lastName,
                    birthday: dateOfBirth
                      ? dateOfBirth.toISOString()
                      : dateBirth,
                    email: email,
                  },
                  asyncToken,
                  asyncRole,
                );
              } else if (
                asyncRole === 'courier' &&
                firstName !== '' &&
                firstName.trim() !== '' &&
                lastName.trim() !== '' &&
                firstName.length >= 3 &&
                lastName.length >= 3 &&
                lastName !== '' &&
                email !== '' &&
                stateCountry &&
                stateCity &&
                message !== 'user with email already exists'
              ) {
                postDataSignUpUpdateFn(
                  {
                    firstName: firstName,
                    lastName: lastName,
                    birthday: dateOfBirth
                      ? dateOfBirth.toISOString()
                      : dateBirth,
                    email: email,
                    cityId: idCity,
                  },
                  asyncToken,
                  asyncRole,
                );
              }

              setIdent(true);
            }}
          />
          <View
            style={{
              height: asyncRole === 'courier' ? 550 : 380,
              justifyContent: 'space-between',
            }}>
            <View style={styles.containerInput}>
              <MainInput
                value={firstName}
                onChangeText={e => setFirstName(e)}
                label="First name"
                placeholder="First name"
                length={true}
              />
            </View>
            {firstName?.length <= 2 && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  First name must be more then 2 characters
                </Text>
              </View>
            )}
            {firstName?.trim() === '' && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  First name cannot be empty
                </Text>
              </View>
            )}
            <View style={styles.containerInput}>
              <MainInput
                value={lastName}
                onChangeText={e => setLastName(e)}
                label="Last name"
                placeholder="Last name"
                length={true}
              />
            </View>
            {lastName?.length <= 2 && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Last name must be more then 2 characters
                </Text>
              </View>
            )}
            {lastName?.trim() === '' && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>Last name cannot be empty</Text>
              </View>
            )}
            <View style={styles.containerInput}>
              <View style={styles.containerBirthDate}>
                <MainInput
                  value={formatDate ? formatDate : dateBirth}
                  label="Date of birth"
                  placeholder="Date of birth"
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => setOpen(true)}>
                  <DateIcon />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerInput}>
              <MainInput
                value={email}
                onChangeText={e => {
                  setEmail(e);
                  setMessageFn('');
                }}
                label="Email"
                placeholder="Email"
              />
            </View>
            {message === 'user with email already exists' && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  User with this email already exists
                </Text>
              </View>
            )}
            {message === 'email address is not valid' && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Email address is not valid
                </Text>
              </View>
            )}
            {email === '' && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>Email cannot be empty</Text>
              </View>
            )}
            <View style={styles.containerInput}>
              <MainInput
                value={phone}
                onChangeText={e => setPhone(e)}
                label="Phone number"
                placeholder="Phone number"
                editable={false}
                phone={true}
              />
            </View>
            {asyncRole === 'courier' && (
              <>
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
                        setId('');
                        setModal(true);
                      }}>
                      <ArrowDown />
                    </TouchableOpacity>
                  </View>
                </View>
                {stateCountry === '' ||
                  (stateCountry === null && ident && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorInput}>
                        State cannot be empty
                      </Text>
                    </View>
                  ))}
                <View style={styles.containerInput}>
                  <View style={styles.containerBirthDate}>
                    <MainInput
                      value={stateCity}
                      label="City"
                      placeholder="City"
                      editable={false}
                    />
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={() => {
                        setCityDrop(true);
                      }}>
                      <ArrowDown />
                    </TouchableOpacity>
                  </View>
                </View>
                {stateCity === '' && ident && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorInput}>City cannot be empty</Text>
                  </View>
                )}
              </>
            )}
            <DatePicker
              modal
              mode="date"
              locale="en"
              timeZoneOffsetInMinutes={true}
              open={open}
              maximumDate={date}
              date={dateOfBirth !== '' ? dateOfBirth : date}
              onConfirm={date => {
                setOpen(false);
                setDateOfBirthFn(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            {allState.length ? (
              <ModalPicker
                scroll={true}
                visible={modal}
                content={() => {
                  return (
                    <>
                      {allState?.map((item, index) => (
                        <TouchableOpacity
                          key={index + 1}
                          onPress={() => {
                            setModal(false);
                            clearAllCity('');
                            setStateCity('');
                            setIdCity('');
                            setId(item.id);
                            setStateCountry(item.name);
                            getAllCity({id: idState});
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
            {allCity?.length ? (
              <ModalPicker
                scroll={true}
                visible={cityDrop}
                content={() => {
                  return (
                    <>
                      <View style={styles.viewSearch}>
                        <SearchIcon />
                        <TextInput
                          color="#000"
                          placeholderTextColor="#322E2C"
                          value={search}
                          placeholder="Select City"
                          onChangeText={e => {
                            setSearch(e);
                          }}
                          style={styles.inputSearch}
                        />
                      </View>
                      {cityDrop && setDropList()}
                    </>
                  );
                }}
              />
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EditProfile;
