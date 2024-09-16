import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../style';
import MainInput from '../../../../components/MainInput';
import DateIcon from '../../../../assets/icons/svg-icons/DateIcon';
import MainButton from '../../../../components/MainButton';
import {useSelector} from 'react-redux';
import {useAction} from '../../../../utils/utils';
import {
  postDataSignUpClient,
  setDateOfBirth,
  setEmail,
  setFirstName,
  setLastName,
  setMessage,
  setResSignUpForm,
} from '../../../../redux/actions/AuthAction';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import GlobalModalInfo from '../../../../components/GlobalInfoModal';

export const UserForm = ({navigation}) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    message,
    asyncRole,
    resSignUpForm,
    asyncToken,
  } = useSelector(state => state.auth);

  const setResPostForm = useAction(setResSignUpForm);
  const setFirstNameFn = useAction(setFirstName);
  const setLastNameFn = useAction(setLastName);
  const setEmailFn = useAction(setEmail);
  const postSignUpClient = useAction(postDataSignUpClient);
  const setMessageFn = useAction(setMessage);
  const setDateOfBirthFn = useAction(setDateOfBirth);
  const today = new Date();

  const [ident, setIdent] = useState(false);
  const [open, setOpen] = useState(false);
  const [infoPopUp, setInfoPopUp] = useState(false);

  useEffect(() => {
    if (asyncRole === 'client') {
      resSignUpForm.success === true
        ? setResPostForm('') && navigation.navigate('PaymentMethod')
        : null;
      setIdent(false);
    }
  }, [resSignUpForm]);

  const formatDate = !dateOfBirth
    ? ''
    : moment(dateOfBirth).format('D MMMM YYYY');

  const handleSignUp = () => {
    if (
      asyncRole === 'client' &&
      firstName.trim() !== '' &&
      firstName.length > 2 &&
      lastName.length > 2 &&
      lastName.trim() !== '' &&
      firstName &&
      lastName &&
      dateOfBirth &&
      email
    ) {
      setMessageFn('');
      postSignUpClient(
        {
          firstName: firstName,
          lastName: lastName,
          birthday: dateOfBirth.toISOString(),
          email: email,
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

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.containerInput}>
          <MainInput
            value={firstName}
            onChangeText={e => {
              setFirstNameFn(e.replace(/[^A-z0-9_]/g, ''));
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
            onChangeText={e => setLastNameFn(e.replace(/[^A-z0-9_]/g, ''))}
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
            <Text style={styles.errorInput}>Date of birth cannot be empty</Text>
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
            keyboard="email-address"
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
        {email === '' && ident && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorInput}>Email cannot be empty</Text>
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
    </>
  );
};
