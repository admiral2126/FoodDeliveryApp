import React, { useState, useRef, useEffect, useMemo, memo } from 'react';
import {
  View,
  StatusBar,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';

import styles from './style';

import { useAction } from '../../../utils/utils';
import {
  postDataPhoneNumber,
  setPhoneSignUp,
} from '../../../redux/actions/AuthAction';

import PhoneArrow from '../../../assets/icons/svg-icons/PhoneArrow';

import BackNavigation from '../../../components/NavigationBack';
import MainButton from '../../../components/MainButton';
import HeaderText from '../../../components/HeaderText';
import GlobalModalInfo from '../../../components/GlobalInfoModal';
import useAuth from '../../../hooks/useAuth';

const PhoneRegister = ({ navigation }) => {
  const { phoneSignUp, resPostPhone } = useSelector(state => state.auth);

  // const postPhone = useAction(postDataPhoneNumber);
  const setPhone = useAction(setPhoneSignUp);
  const { signInWithPhoneNumber } = useAuth();
  // const [value, setValue] = useState('0498403994');
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [infoPopUp, setInfoPopUp] = useState(false);

  const phoneInput = useRef(null);

  const handlePost = async () => {
    // postPhone({phone: phoneSignUp});
    console.log(phoneSignUp);
    try {
      const confirm = await signInWithPhoneNumber(phoneSignUp);
      navigation.navigate('VerifyPhone', { confirm });
    } catch (err) {
      console.log('ERR:', err);
    }
  };
  const handlePress = async () => {
    const checkValid = phoneInput.current?.isValidNumber(phoneSignUp);
    await setShowMessage(true);
    setValid(checkValid ? checkValid : false);
    await handlePost();
  };

  useEffect(() => {
    if (value.length >= 10) {
      setValue(value.slice(0, 10));
    }
  }, [value]);

  useEffect(() => {
    // if (resPostPhone.success && valid) {
    //   navigation.navigate('VerifyPhone');
    // }
    if (resPostPhone.success === false) {
      setInfoPopUp(true);
    }
  }, [resPostPhone]);

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback
          style={styles.mainContainer}
          onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainContainer]}>
            <View>
              <StatusBar barStyle="dark-content" />
              <BackNavigation
                navigatePress={() => navigation.goBack()}
                navigationTitle="Authorisation"
              />
              <HeaderText
                title="Registration or Log In by phone number"
                subTitle="Enter your phone number. We will send a 4-digit code for registration."
                content={true}
                height={true}
                align={true}
              />
              <View style={styles.viewPhoneInput}>
                <PhoneInput
                  ref={phoneInput}
                  value={value}
                  // defaultCode="BE"
                  defaultCode="US"
                  layout="first"
                  placeholder="(XXX) XXX XXXX"
                  onChangeText={phone => {
                    setValue(phone);
                  }}
                  onChangeFormattedText={phone => {
                    setPhone(phone);
                  }}
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.textContainerStyles}
                  textInputStyle={styles.inputElement}
                  renderDropdownImage={<PhoneArrow />}
                />
              </View>
            </View>
            <View style={styles.validContainer}>
              {showMessage && valid === false && (
                <Text style={styles.validText}>Your phone is invalid.</Text>
              )}
            </View>
            <View style={styles.containerButton}>
              <MainButton onPress={handlePress} buttonText="Send code" />
              <View style={styles.serviceTextContainer}>
                <Text style={styles.servicesText}>
                  By creating account, I accept the Name App{' '}
                  <Text
                    onPress={() => {
                      navigation.navigate('Terms');
                    }}
                    style={styles.linkText}>
                    Terms of Conditions
                  </Text>{' '}
                  and{' '}
                  <Text
                    onPress={() => {
                      navigation.navigate('Privacy');
                    }}
                    style={styles.linkText}>
                    The Privacy Policy.
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <GlobalModalInfo
          visible={infoPopUp}
          buttonText="OK"
          onPressOkey={() => {
            setInfoPopUp(false);
          }}
          headerInfo="Info"
          infoText={resPostPhone.message}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(PhoneRegister);
