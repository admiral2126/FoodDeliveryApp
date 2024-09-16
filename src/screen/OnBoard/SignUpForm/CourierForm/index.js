import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../style';
import MainInput from '../../../../components/MainInput';
import DateIcon from '../../../../assets/icons/svg-icons/DateIcon';
import ArrowDown from '../../../../assets/icons/svg-icons/ArrowDown';
import {useSelector} from 'react-redux';
import {useAction} from '../../../../utils/utils';
import {
  getDataAllCity,
  getDataAllState,
  postDataSignUpCourier,
  setAllCity,
  setCity,
  setCityId,
  setCountry,
  setDateOfBirth,
  setEmail,
  setFirstName,
  setIdState,
  setLastName,
  setMessage,
  setResSignUpForm,
} from '../../../../redux/actions/AuthAction';
import moment from 'moment';
import ModalPicker from '../../../../components/ModalPicker';
import SearchIcon from '../../../../assets/icons/svg-icons/SearchIcon';
import MainButton from '../../../../components/MainButton';
import DatePicker from 'react-native-date-picker';
import GlobalModalInfo from '../../../../components/GlobalInfoModal';

export const CourierForm = ({navigation}) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    country,
    city,
    message,
    asyncRole,
    resSignUpForm,
    allState,
    allCity,
    asyncToken,
    idState,
    idCity,
  } = useSelector(state => state.auth);
  const setFirstNameFn = useAction(setFirstName);
  const setLastNameFn = useAction(setLastName);
  const setResPostForm = useAction(setResSignUpForm);
  const setDateOfBirthFn = useAction(setDateOfBirth);
  const setEmailFn = useAction(setEmail);
  const setIdCity = useAction(setCityId);
  const clearCity = useAction(setAllCity);
  const setCountryFn = useAction(setCountry);
  const setCityFn = useAction(setCity);
  const setId = useAction(setIdState);
  const setMessageFn = useAction(setMessage);
  const postSignUpCourier = useAction(postDataSignUpCourier);
  const getAllState = useAction(getDataAllState);
  const getAllCity = useAction(getDataAllCity);
  const today = new Date();

  const [ident, setIdent] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [cityDrop, setCityDrop] = useState(false);
  const [search, setSearch] = useState('');
  const [infoPopUp, setInfoPopUp] = useState(false);

  const formatDate = !dateOfBirth
    ? ''
    : moment(dateOfBirth).format('D MMMM YYYY');

  useEffect(() => {
    resSignUpForm.success === true
      ? setResPostForm('') && navigation.navigate('AppSent')
      : null;
    setIdent(false);
  }, [resSignUpForm]);

  useEffect(() => {
    if (asyncRole === 'courier') {
      getAllState();
    }
  }, []);

  useEffect(() => {
    if (asyncRole === 'courier' && country) {
      getAllCity({id: idState});
    }
  }, [idState]);

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
              setCityFn(item.name);
              setSearch('');
            }}
            style={styles.elementTouch}>
            <Text style={styles.elementStyle}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  const handleSignUp = () => {
    if (
      asyncRole === 'courier' &&
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      firstName &&
      lastName &&
      dateOfBirth &&
      email &&
      country &&
      city &&
      message === ''
    ) {
      setMessageFn('');
      postSignUpCourier(
        {
          firstName: firstName,
          lastName: lastName,
          birthday: dateOfBirth.toISOString(),
          email: email,
          cityId: idCity,
        },
        asyncToken,
      );
    }
  };

  useEffect(() => {
    if (
      message &&
      message !== 'Customer must be at least 13 years old' &&
      message !== 'user with email address already exists' &&
      message !== 'email address is not valid' &&
      message !== 'user with email address already exists'
    ) {
      setInfoPopUp(true);
    }
  }, [message]);

  const handleClickState = item => {
    setModal(false);
    clearCity('');
    setIdCity('');
    setCityFn('');
    setId(item.id);
    setCountryFn(item.name);
  };

  return (
    <>
      <View style={[styles.inputContainer, {minHeight: 500}]}>
        <View style={styles.containerInput}>
          <MainInput
            value={firstName}
            onChangeText={e => {
              setFirstNameFn(e);
            }}
            label="First name"
            placeholder="First name"
            length={true}
          />
        </View>
        {firstName.length <= 2 && ident && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>
              First name must be more then 2 characters
            </Text>
          </View>
        )}
        {firstName.trim() === '' && ident && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>First name cannot be empty</Text>
          </View>
        )}
        <View style={styles.containerInput}>
          <MainInput
            value={lastName}
            onChangeText={e => setLastNameFn(e)}
            label="Last name"
            placeholder="Last name"
            length={true}
          />
        </View>
        {lastName.length <= 2 && ident && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>
              Last name must be more then 2 characters
            </Text>
          </View>
        )}
        {lastName.trim() === '' && ident && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>Last name cannot be empty</Text>
          </View>
        )}
        <View style={styles.containerInput}>
          <View style={styles.containerBirthDate}>
            <MainInput
              value={formatDate}
              onChangeText={e => setDateOfBirthFn(e)}
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
        {dateOfBirth.length === 0 && ident && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>
              Date of birth name cannot be empty
            </Text>
          </View>
        )}
        {message === 'Customer must be at least 13 years old' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>
              Customer must be at least 13 years old
            </Text>
          </View>
        )}
        <View style={styles.containerInput}>
          <MainInput
            value={email}
            onChangeText={e => setEmailFn(e)}
            label="Email"
            placeholder="Email"
          />
        </View>
        {message === 'user with email address already exists' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>
              User with email address already exists
            </Text>
          </View>
        )}
        {message === 'email address is not valid' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>Email address is not valid</Text>
          </View>
        )}
        {email.length === 0 && ident && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>Email cannot be empty</Text>
          </View>
        )}
        <View style={styles.containerInput}>
          <View style={styles.containerBirthDate}>
            <MainInput
              value={country}
              label="State"
              placeholder="State"
              editable={false}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                setModal(true);
              }}>
              <ArrowDown />
            </TouchableOpacity>
          </View>
        </View>
        {country === '' && ident && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>State cannot be empty</Text>
          </View>
        )}
        <View style={styles.containerInput}>
          <View style={styles.containerBirthDate}>
            <MainInput
              value={city}
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
        {city === '' && ident && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>City cannot be empty</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            setIdent(true);
            handleSignUp();
            setMessageFn('');
          }}
          buttonText="Continue"
        />
      </View>
      <DatePicker
        modal
        mode="date"
        locale="en"
        open={open}
        maximumDate={today}
        date={dateOfBirth !== '' ? dateOfBirth : today}
        onConfirm={date => {
          setOpen(false);
          setDateOfBirthFn(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <GlobalModalInfo
        visible={infoPopUp}
        buttonText="OK"
        onPressOkey={() => {
          setInfoPopUp(false);
          setMessageFn('');
        }}
        headerInfo="Info"
        infoText={message}
      />
      {!!allState.length && (
        <ModalPicker
          visible={modal}
          scroll={true}
          content={() => (
            <>
              {allState?.map((item, index) => (
                <TouchableOpacity
                  key={index + 1}
                  onPress={() => handleClickState(item)}
                  style={styles.elementTouch}>
                  <Text style={styles.elementStyle}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        />
      )}
      {!!allCity?.length && (
        <ModalPicker
          visible={cityDrop}
          scroll={true}
          content={() => (
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
          )}
        />
      )}
    </>
  );
};
