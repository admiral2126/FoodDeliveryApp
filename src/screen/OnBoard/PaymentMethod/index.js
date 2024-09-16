import React, {useEffect, useState} from 'react';
import {View, StatusBar, SafeAreaView, Text, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import RadioButton from 'react-native-radio-button';

import {useAction} from '../../../utils/utils';

import {
  setPayment,
  setFirstName,
  setLastName,
  setDateOfBirth,
  setEmail,
  setCountry,
  setCity,
  setResSignUpForm,
  setChangeNavigation,
} from '../../../redux/actions/AuthAction';

import {
  postDataPaySettingsUpdate,
  getDataListAllCreditCard,
} from '../../../redux/actions/MainUserAction';

import styles from './style';

import ApplePay from '../../../assets/icons/svg-icons/PaymentIcon/ApplePay';
import GooglePay from '../../../assets/icons/svg-icons/PaymentIcon/GooglePay';
import BankCard from '../../../assets/icons/svg-icons/PaymentIcon/BankCard';

import HeaderText from '../../../components/HeaderText';
import MainButton from '../../../components/MainButton';
import BackNavigation from '../../../components/NavigationBack';

const PaymentMethod = ({navigation}) => {
  const {userClass, payment, resSignUpForm, asyncToken} = useSelector(
    state => state.auth,
  );

  const setPaymentMet = useAction(setPayment);
  const setResPostForm = useAction(setResSignUpForm);
  const setFirstNameFn = useAction(setFirstName);
  const setLastNameFn = useAction(setLastName);
  const setDateOfBirthFn = useAction(setDateOfBirth);
  const setEmailFn = useAction(setEmail);
  const setCountryFn = useAction(setCountry);
  const setCityFn = useAction(setCity);
  const postDataPaySettingsUpdateFn = useAction(postDataPaySettingsUpdate);
  const setNav = useAction(setChangeNavigation);
  const getDataListAllCreditCardFn = useAction(getDataListAllCreditCard);

  useEffect(() => {
    setResPostForm('');
    setDateOfBirthFn('');
    setFirstNameFn('');
    setLastNameFn('');
    setDateOfBirthFn('');
    setEmailFn('');
    setCountryFn('');
    setCityFn('');
  }, []);

  const [payType, setPayType] = useState('');

  const mainIcon = type => {
    switch (type) {
      case 'Apple Pay':
        return <ApplePay />;
      case 'Google Pay':
        return <GooglePay />;
      case 'Bank Card':
        return <BankCard />;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation navigatePress={() => navigation.goBack()} />
        <HeaderText
          title="Payment method"
          subTitle="Choose a payment method for orders."
          content={true}
          height={false}
          align={true}
        />
        <View style={styles.allPaymentContainer}>
          {payment?.map((item, index) => {
            if (
              (item.title === 'Apple Pay' && Platform.OS === 'ios') ||
              (item.title === 'Bank Card' && Platform.OS === 'ios') ||
              (item.title === 'Google Pay' && Platform.OS === 'android') ||
              (item.title === 'Bank Card' && Platform.OS === 'android')
            ) {
              return (
                <View
                  key={index + 1}
                  style={[
                    styles.paymentContainer,
                    {
                      borderColor: item.selected
                        ? 'rgba(162, 28, 20, 0.3)'
                        : '#fff',
                    },
                  ]}>
                  <View style={styles.leftContainer}>
                    <View style={{marginRight: 12}}>
                      {mainIcon(item.title)}
                    </View>
                    <Text style={styles.textStyle}>{item.title}</Text>
                  </View>
                  <View style={styles.radioContainer}>
                    <RadioButton
                      innerColor="#A11C14"
                      outerColor="#A11C14"
                      isSelected={item.selected ? true : false}
                      onPress={() => {
                        setPayType(item.title);
                        setPaymentMet(item.title);
                        postDataPaySettingsUpdateFn(
                          {
                            type:
                              (item.title === 'Apple Pay' && 'ApplePay') ||
                              (item.title === 'Google Pay' && 'GooglePay'),
                          },
                          asyncToken,
                        );
                      }}
                    />
                  </View>
                </View>
              );
            }
          })}
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            onPress={() => {
              if (payType === 'Google Pay' || payType === 'Apple Pay') {
                getDataListAllCreditCardFn(asyncToken);
                setNav(true);
              }
              if (payType === 'Bank Card') {
                setPaymentMet('');
                navigation.navigate('AddNewCard');
              }
            }}
            buttonText="Complete"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethod;
