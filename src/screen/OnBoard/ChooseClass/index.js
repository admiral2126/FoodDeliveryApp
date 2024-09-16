import React, {useEffect} from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import styles from './style';

import {
  setUserClass,
  setResProfile,
  setFirstName,
  setLastName,
  setDateOfBirth,
  setEmail,
  setCountry,
  setCity,
  setResSignUpForm,
} from '../../../redux/actions/AuthAction';
import {useAction} from '../../../utils/utils';

import {setListAddress} from '../../../redux/actions/MainUserAction';

import ButtonChoseClass from '../../../components/ChooseClassUser';
import HeaderText from '../../../components/HeaderText';

const ChooseType = ({navigation}) => {
  const setUser = useAction(setUserClass);
  const setResProfileFn = useAction(setResProfile);
  const setResPostForm = useAction(setResSignUpForm);
  const setFirstNameFn = useAction(setFirstName);
  const setLastNameFn = useAction(setLastName);
  const setDateOfBirthFn = useAction(setDateOfBirth);
  const setEmailFn = useAction(setEmail);
  const setCountryFn = useAction(setCountry);
  const setCityFn = useAction(setCity);
  const setListAddressFn = useAction(setListAddress);

  useEffect(() => {
    setResPostForm('');
    setDateOfBirthFn('');
    setFirstNameFn('');
    setLastNameFn('');
    setDateOfBirthFn('');
    setEmailFn('');
    setCountryFn('');
    setCityFn('');
    setListAddressFn([]);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <HeaderText
          title="Nice to meet you!"
          subTitle="Select the way of using the app below."
          content={true}
          height={true}
          align={true}
        />
        <View style={styles.buttonBlockContainer}>
          <ButtonChoseClass
            onPress={() => {
              setUser('client');
              setResProfileFn({});
              navigation.navigate('PhoneRegister');
            }}
            title="I’m a user  👧"
            subTitle="I want to order food from different cafes and restaurants."
          />
          <ButtonChoseClass
            onPress={() => {
              setUser('courier');
              setResProfileFn({});
              navigation.navigate('PhoneRegister');
            }}
            title="I’m a driver  🚗"
            subTitle="I want to deliver food from different cafes and restaurants."
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseType;
