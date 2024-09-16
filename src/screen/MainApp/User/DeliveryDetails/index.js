import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';

import RadioButton from 'react-native-radio-button';
import { useSelector } from 'react-redux';
import { useStripe } from '@stripe/stripe-react-native';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import Geolocation from 'react-native-geolocation-service';
import { useGooglePay, useApplePay } from '@stripe/stripe-react-native';

import {
  setPayment,
  getDataAllState,
} from '../../../../redux/actions/AuthAction';

import {
  getDataAddressList,
  setAddress,
  setDeliveryType,
  postDataDeliveryType,
  postDataDeliveryAddress,
  postDataDeliveryPaymentType,
  getDataListAllCreditCard,
  postDataDeliveryTime,
  postDataConfirmOrder,
  setResAddDeliverAddress,
  setResConfirmOrder,
  setOneTimeCard,
  setFinallyDeliveryTime,
  setAddressStreetName,
  setFullAddAddress,
  setCardName,
  setPayName,
  postDataSimpleOrderInfo,
} from '../../../../redux/actions/MainUserAction';

import { postDataGeoInfoAndTakeData } from '../../../../redux/actions/MainDriverAction';

import { useAction } from '../../../../utils/utils';

import styles from './style';
import colors from '../../../../assets/colors/colors';

import ArrowRightRed from '../../../../assets/icons/svg-icons/ArrowRightRed';
import PlusIcon from '../../../../assets/icons/svg-icons/PlusIcon';
import ApplePay from '../../../../assets/icons/svg-icons/PaymentIcon/ApplePay';
import GooglePay from '../../../../assets/icons/svg-icons/PaymentIcon/GooglePay';
import BankCard from '../../../../assets/icons/svg-icons/PaymentIcon/BankCard';

import BackNavigation from '../../../../components/NavigationBack';
import MainButton from '../../../../components/MainButton';
import ModalDelivery from '../../../../components/ModalDelivery';
import { ScrollView } from 'react-native-gesture-handler';
import { FinalPrices } from './FinalPrices';
import ModalError from "../../../../components/ModalError";


const DeliveryDetails = ({ navigation }) => {
  const { asyncToken } = useSelector(state => state.auth);

  const {
    deliceryType,
    address,
    singleAddress,
    resProceedOrder,
    creditCardList,
    resDeliveryTime,
    resConfirm,
    oneTimeCard,
    finallyDeliveryTime,
    fullAddAddress,
    cardName,
    resListDefCard,
    payName,
    confirmOrderPay,
    resSimpleOrder,
  } = useSelector(state => state.main);

  const { geoInfo } = useSelector(state => state.driver);

  const stripe = useStripe();
  const timeRef = useRef();

  const setDeliveryTypeFn = useAction(setDeliveryType);
  const getDataAddressListFn = useAction(getDataAddressList);
  const setAddressFn = useAction(setAddress);
  const setPaymentMet = useAction(setPayment);

  const postDataDeliveryTypeFn = useAction(postDataDeliveryType);
  const postDataDeliveryAddressFn = useAction(postDataDeliveryAddress);
  const postDataDeliveryPaymentTypeFn = useAction(postDataDeliveryPaymentType);
  const getDataListAllCreditCardFn = useAction(getDataListAllCreditCard);
  const postDataDeliveryTimeFn = useAction(postDataDeliveryTime);
  const postDataConfirmOrderFn = useAction(postDataConfirmOrder);
  const setResAddDeliverAddressFn = useAction(setResAddDeliverAddress);
  const setResConfirmOrderFn = useAction(setResConfirmOrder);
  const setOneTimeCardFn = useAction(setOneTimeCard);
  const setFinallyDeliveryTimeFn = useAction(setFinallyDeliveryTime);
  const setAddressStreetNameFn = useAction(setAddressStreetName);
  const setFullAddAddressFn = useAction(setFullAddAddress);
  const setCardNameFn = useAction(setCardName);
  const setPayNameFn = useAction(setPayName);
  const postDataGeoInfoAndTakeDataFn = useAction(postDataGeoInfoAndTakeData);
  const getAllState = useAction(getDataAllState);
  const postDataSimpleOrderInfoFn = useAction(postDataSimpleOrderInfo);

  const [deliveryCheck, setDeliveryCheck] = useState('');

  const [location, setLocation] = useState(null);
  const [error, setError] = useState({});
  const [modalAddress, setModalAddress] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);
  const [modalTime, setModalTime] = useState(false);

  const [dayValue, setDayValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [activeSpin, setActiveSpin] = useState(false);
  const [deliveryDetailsAdress, setDeliveryDetailsAddress] = useState(false);
  const [payState, setPayState] = useState('');

  const [threeDSecure, setThreeDSecure] = useState();

  const mainIcon = type => {
    switch (type) {
      case 'ApplePay':
        return <ApplePay />;
      case 'GooglePay':
        return <GooglePay />;
      case 'Bank Card':
        return <BankCard />;
      default:
        break;
    }
  };

  const { initGooglePay, presentGooglePay } = useGooglePay();

  const { isApplePaySupported, presentApplePay, confirmApplePayPayment } =
    useApplePay();

  useEffect(() => {
    getDataAddressListFn(asyncToken);
    getDataListAllCreditCardFn(asyncToken);
  }, [fullAddAddress]);

  useEffect(() => {
    resDeliveryTime.message === 'success' && setModalTime(false);
    resDeliveryTime.message === 'success' &&
      setFinallyDeliveryTimeFn(dayValue + ' ' + timeValue);
  }, [resDeliveryTime]);

  useEffect(() => {
    if (
      payState === 'true' &&
      !payState &&
      resConfirm.success &&
      payName !== 'Card'
    ) {
      postDataSimpleOrderInfoFn({ id: resConfirm.data.id }, asyncToken);
    } else if (resConfirm.success && payName === 'Card') {
      postDataSimpleOrderInfoFn({ id: resConfirm.data.id }, asyncToken);
    }
  }, [payState, resConfirm]);

  useEffect(() => {
    setPayNameFn(resListDefCard.type);
    setCardNameFn(resListDefCard.paymentCardId);
  }, []);

  useEffect(() => {
    if (
      resListDefCard.type === 'ApplePay' ||
      resListDefCard.type === 'GooglePay'
    ) {
      setOneTimeCardFn(resListDefCard.type);
    } else if (resListDefCard.type === 'Card') {
      creditCardList.forEach(item => {
        if (item.isDefault) {
          setOneTimeCardFn(`Bank Card **** ${item.lastDigits}`);
        }
      });
    }
  }, []);

  const handleGooglePay = async () => {
    const { error } = await initGooglePay({
      testEnv: true,
      merchantName: '<Your merchant name>',
      countryCode: 'US',
      billingAddressConfig: {
        format: 'FULL',
        isPhoneNumberRequired: true,
        isRequired: false,
      },
      existingPaymentMethodRequired: false,
      isEmailRequired: true,
    });
    if (error) {
      Alert.alert(error.code, error.message);
    }
  };

  const googlePay = async () => {
    const clientSecret = confirmOrderPay.clientSecret;

    const { error } = await presentGooglePay({
      clientSecret,
      forSetupIntent: false,
    });

    if (error) {
      setError({
        title: 'Google Pay failed',
        description: error?.message,
      });
      // Alert.alert(error.code, error.message);
      setPayState('false');
      setActiveSpin(false);
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return;
    }
    if (!error) {
      setActiveSpin(false);
      navigation.navigate('DeliveryTrackMap');
    }
    Alert.alert('Success', 'The payment was confirmed successfully.');
    setPayState('true');
  };

  const applePay = async () => {
    if (!isApplePaySupported) {
      return;
    }
    if (confirmOrderPay.order.items.length > 0) {
      const {error: appleError} = await presentApplePay({
        cartItems: [
          {
            label: 'WXW services',
            amount: `${confirmOrderPay.order.finalPrice}`,
          },
        ],
        country: 'US',
        currency: 'USD',
      });
      if (appleError) {
        setActiveSpin(false);
        setError({
          title: 'Apple Pay failed',
          description: 'The payment has been cancelled',
        });
      } else {
        const clientSecret = confirmOrderPay.clientSecret;

        const { error: confirmError } = await confirmApplePayPayment(
          clientSecret,
        );
        if (confirmError) {
          setActiveSpin(false);
          setError({
            title: 'Apple Pay failed',
            description: 'The payment has been failed',
          });
          setPayState('false');
          Alert.alert('Error Apple Pay', confirmError);
        } else {
          setActiveSpin(false);
          navigation.navigate('DeliveryTrackMap');
        }
      }
      if (!appleError) {
        setPayState('true');
      }
    }
  };

  const handelConfirmThreeDSecurePay = async () => {
    const myOrder = resConfirm;

    let paymentMethod = myOrder?.data.paymentIntentId;
    if (!paymentMethod)
      return this.Alert('Payment-Method: is not yet supported');
    try {
      setActiveSpin(true);
      const paymentIntent = await stripe.handleCardAction(
        myOrder.data.clientSecret,
      );
      setThreeDSecure(paymentIntent);
      setActiveSpin(false);
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  useEffect(() => {
    if (!resConfirm.success) {
      setTimeout(() => {
        setActiveSpin(false);
      }, 5000);
    }

    if (resConfirm?.data?.requiresAction) {
      handelConfirmThreeDSecurePay();
    }

    if (resSimpleOrder.id && resConfirm.success) {
      setActiveSpin(false);
      navigation.navigate('DeliveryTrackMap');
      setAddressStreetNameFn('');
      setOneTimeCardFn('');
      setFinallyDeliveryTimeFn('');
      setPaymentMet('');
      setCardNameFn('');
      setFullAddAddressFn('');
      setPayState('');
      setDeliveryCheck('Conventional delivery');
      setDeliveryTypeFn('Conventional delivery');
    }
  }, [resSimpleOrder, resConfirm]);

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      payName === 'GooglePay' &&
      confirmOrderPay.clientSecret
    ) {
      googlePay();
    }
  }, [confirmOrderPay]);

  useEffect(() => {
    if (
      Platform.OS === 'ios' &&
      payName === 'ApplePay' &&
      confirmOrderPay.clientSecret
    ) {
      applePay();
    }
  }, [confirmOrderPay]);

  const dayArray = ['--', 'Today'];

  const hours = [
    { id: 0, value: '--' },
    { id: 1, value: 'Now' },
  ];

  //TODO unnecessary for V1
  /*for (let i = 1; i <= 24; i++) {
      hours.push({
        id: i,
        value: i < 13 ? `${i}:00 AM` : `${i - 12}:00 PM`,
      });
    }*/

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  useEffect(() => {
    if (geoInfo.message === 'success' && deliveryDetailsAdress) {
      setModalAddress(false);
      setResAddDeliverAddressFn('');
      navigation.navigate('AddressDeliveryDetails');
      setDeliveryDetailsAddress(false);
    }
  }, [geoInfo]);

  useEffect(() => {
    if (threeDSecure) {
      console.log('3D SECURE - DONE!!!!!', threeDSecure);
      if (threeDSecure?.error) {
        return setError({
          title: '3d secure failed',
          description: threeDSecure?.error?.message,
        });
      }
      postDataConfirmOrderFn({id: resProceedOrder.data.id}, asyncToken);
      navigation.navigate('DeliveryTrackMap');
    }
  }, [threeDSecure]);

  const handleOrder = async () => {
    setActiveSpin(true);

    deliveryCheck === 'Conventional delivery' &&
      (await postDataDeliveryTypeFn(
        {
          id: resProceedOrder.data.id,
          type: 'Conventional',
        },
        asyncToken,
      ));
    postDataConfirmOrderFn({ id: resProceedOrder.data.id }, asyncToken);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        {activeSpin ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 100, width: '70%' }}>
              <Text
                style={{
                  fontFamily: 'Manrope',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                Your order is currently being processed
              </Text>
            </View>
            <ActivityIndicator
              size="large"
              color={colors.buttonBackGroundColor}
            />
          </View>
        ) : (
          <>
            <StatusBar barStyle="dark-content" />
            <BackNavigation
              navigationTitle="Delivery details"
              navigatePress={() => navigation.navigate('CartScreen')}
            />
            <TouchableOpacity
              onPress={() => setModalAddress(true)}
              style={styles.oneLinesDetails}>
              <View style={styles.leftContainerLine}>
                <Text style={styles.leftTextContainer}>Delivery Address</Text>
              </View>
              <View style={styles.rightContainerLine}>
                <Text style={styles.rightTextNearArrow} numberOfLines={1}>
                  {fullAddAddress.length
                    ? fullAddAddress
                    : singleAddress
                    ? `${singleAddress?.apartment}, ${singleAddress?.street}, ${singleAddress?.city}`
                    : 'Address'}
                </Text>
                <ArrowRightRed />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalPayment(true);
              }}
              style={styles.oneLinesDetails}>
              <View style={styles.leftContainerLine}>
                <Text style={styles.leftTextContainer}>Payment Method</Text>
              </View>
              <View style={styles.rightContainerLine}>
                <Text style={styles.rightTextNearArrow} numberOfLines={1}>
                  {oneTimeCard ? oneTimeCard : 'Payment Type'}
                </Text>
                <ArrowRightRed />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalTime(true);
                setDayValue(dayArray[1]);
                setTimeValue(hours[1].value);
                setFinallyDeliveryTimeFn('');
              }}
              style={styles.oneLinesDetails}>
              <View style={styles.leftContainerLine}>
                <Text style={styles.leftTextContainer}>Delivery Time</Text>
              </View>
              <View style={styles.rightContainerLine}>
                <Text style={styles.rightTextNearArrow} numberOfLines={1}>
                  {finallyDeliveryTime ? finallyDeliveryTime : 'Time'}
                </Text>
                <ArrowRightRed />
              </View>
            </TouchableOpacity>
            <View
              style={[
                styles.deliveryTypeContainer,
                {
                  flex: resConfirm ? 0 : 1,
                },
              ]}>
              <Text style={styles.headerTextType}>Delivery Type</Text>
              {deliceryType?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index + 1}
                    onPress={() => {
                      setDeliveryCheck(item.title);
                      setDeliveryTypeFn(item.title);
                      postDataDeliveryTypeFn(
                        {
                          id: resProceedOrder.data.id,
                          type:
                            item.title === 'Conventional delivery'
                              ? 'Conventional'
                              : 'Contactless',
                        },
                        asyncToken,
                      );
                    }}
                    style={[
                      styles.deliveryContainer,
                      {
                        borderColor: item.selected
                          ? colors.buttonBackGroundColor
                          : colors.pinkLightBorder,
                      },
                    ]}>
                    <View style={styles.radioContainer}>
                      <RadioButton
                        innerColor="#A11C14"
                        outerColor="#A11C14"
                        isSelected={item.selected ? true : false}
                        onPress={() => {
                          setDeliveryCheck(item.title);
                          setDeliveryTypeFn(item.title);
                          postDataDeliveryTypeFn(
                            {
                              id: resProceedOrder.data.id,
                              type:
                                item.title === 'Conventional delivery'
                                  ? 'Conventional'
                                  : 'Contactless',
                            },
                            asyncToken,
                          );
                        }}
                      />
                    </View>
                    <View style={styles.leftContainer}>
                      <Text numberOfLines={1} style={styles.textStyle}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <FinalPrices />
            {resConfirm?.message !== 'success' ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  {resConfirm?.message !==
                    'order has been confirmed successfully' &&
                    resConfirm?.message}
                </Text>
              </View>
            ) : null}
            <View style={{ marginBottom: 20 }}>
              <MainButton onPress={handleOrder} buttonText="Order" />
            </View>
          </>
        )}

        <ModalDelivery
          visible={modalAddress}
          pressCancel={() => {
            setModalAddress(false);
          }}
          content={() => {
            return (
              <>
                <View style={styles.headerContainer}>
                  <Text style={styles.textHeaderModal}>Delivery Address</Text>
                </View>
                <ScrollView
                  style={{ flex: 1 }}
                  persistentScrollbar={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1 }}>
                  {address.length
                    ? address?.map((item, index) => (
                        <TouchableOpacity
                          key={index + 1}
                          onPress={() => {
                            setFullAddAddressFn('');
                            setAddressFn(item);
                            postDataDeliveryAddressFn(
                              {
                                id: resProceedOrder.data.id,
                                deliveryAddressId: item.id,
                              },
                              asyncToken,
                            );
                          }}
                          style={[
                            styles.paymentContainer,
                            {
                              borderColor:
                                singleAddress === item
                                  ? 'rgba(162, 28, 20, 0.3)'
                                  : '#fff',
                            },
                          ]}>
                          <View style={styles.leftContainerAddress}>
                            <Text style={styles.textHeaderAddress}>
                              {item.label}
                            </Text>
                            <Text style={styles.cityTextStyle}>
                              {item.apartment}, {item.street}, {item.city}
                            </Text>
                          </View>
                          <View style={styles.radioContainerAddress}>
                            <RadioButton
                              innerColor="#A11C14"
                              outerColor="#A11C14"
                              isSelected={singleAddress === item ? true : false}
                              onPress={() => {
                                setFullAddAddressFn('');
                                setAddressFn(item);

                                postDataDeliveryAddressFn(
                                  {
                                    id: resProceedOrder.data.id,
                                    deliveryAddressId: item.id,
                                  },
                                  asyncToken,
                                );
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      ))
                    : null}
                  <TouchableOpacity
                    onPress={() => {
                      // navigation.navigate('CPSAddressDelivery');
                      getAllState(asyncToken);
                      postDataGeoInfoAndTakeDataFn(
                        {
                          lat: location.latitude,
                          lon: location.longitude,
                          type: 'google',
                        },
                        asyncToken,
                      );
                      setDeliveryDetailsAddress(true);
                    }}
                    style={styles.addAddressContainer}>
                    <View style={styles.contentAddContainer}>
                      <PlusIcon />
                      <Text style={styles.textButtonAdd}>Add new address</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </>
            );
          }}
        />
        <ModalDelivery
          visible={modalPayment}
          pressCancel={() => {
            setModalPayment(false);
          }}
          content={() => {
            return (
              <>
                <View style={styles.headerContainer}>
                  <Text style={styles.textHeaderModal}>Payment Type</Text>
                </View>
                <ScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={styles.allPaymentContainer}>
                    {resListDefCard.paymentTypes?.map((item, index) => {
                      if (
                        item === 'ApplePay' &&
                        Platform.OS === 'ios' &&
                        isApplePaySupported
                      ) {
                        return (
                          <TouchableOpacity
                            key={index + 1}
                            onPress={() => {
                              setPayNameFn(item);
                              setPaymentMet(item);
                              setOneTimeCardFn(item);
                              setCardNameFn('');
                              postDataDeliveryPaymentTypeFn(
                                {
                                  id: resProceedOrder.data.id,
                                  type: item,
                                  // paymentCardId: ,
                                },
                                asyncToken,
                              );
                            }}
                            style={[
                              styles.paymentContainerModal,
                              {
                                borderColor:
                                  item === payName
                                    ? 'rgba(162, 28, 20, 0.3)'
                                    : '#fff',
                              },
                            ]}>
                            <View style={styles.leftContainerPayment}>
                              <View style={{ marginRight: 12 }}>
                                {mainIcon(item)}
                              </View>
                              <Text style={styles.textStylePay}>{item}</Text>
                            </View>
                            <View style={styles.radioContainerPayment}>
                              <RadioButton
                                innerColor="#A11C14"
                                outerColor="#A11C14"
                                isSelected={item === payName ? true : false}
                                onPress={() => {
                                  setPaymentMet(item);
                                  setOneTimeCardFn(item);
                                  setCardNameFn('');
                                  setPayNameFn(item);
                                  postDataDeliveryPaymentTypeFn(
                                    {
                                      id: resProceedOrder.data.id,
                                      type: item,
                                      // paymentCardId: ,
                                    },
                                    asyncToken,
                                  );
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      } else if (
                        item === 'GooglePay' &&
                        Platform.OS === 'android'
                      ) {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setPayNameFn(item);
                              setPaymentMet(item);
                              setOneTimeCardFn(item);
                              setCardNameFn('');
                              postDataDeliveryPaymentTypeFn(
                                {
                                  id: resProceedOrder.data.id,
                                  type: item,
                                  // paymentCardId: ,
                                },
                                asyncToken,
                              );
                              handleGooglePay();
                            }}
                            key={index + 1}
                            style={[
                              styles.paymentContainerModal,
                              {
                                borderColor:
                                  item === payName
                                    ? 'rgba(162, 28, 20, 0.3)'
                                    : '#fff',
                              },
                            ]}>
                            <View style={styles.leftContainerPayment}>
                              <View style={{ marginRight: 12 }}>
                                {mainIcon(item)}
                              </View>
                              <Text style={styles.textStylePay}>{item}</Text>
                            </View>
                            <View style={styles.radioContainerPayment}>
                              <RadioButton
                                innerColor="#A11C14"
                                outerColor="#A11C14"
                                isSelected={item === payName ? true : false}
                                onPress={() => {
                                  setPaymentMet(item);
                                  setOneTimeCardFn(item);
                                  setCardNameFn('');
                                  setPayNameFn(item);
                                  postDataDeliveryPaymentTypeFn(
                                    {
                                      id: resProceedOrder.data.id,
                                      type: item,
                                      // paymentCardId: ,
                                    },
                                    asyncToken,
                                  );
                                  handleGooglePay();
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    })}
                    {creditCardList.length >= 1 &&
                      creditCardList?.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index + 1}
                            onPress={() => {
                              setCardNameFn(item.id);
                              setOneTimeCardFn(
                                `Bank Card **** ${item.lastDigits}`,
                              );
                              setPaymentMet('Card');
                              setPayNameFn('Card');
                              postDataDeliveryPaymentTypeFn(
                                {
                                  id: resProceedOrder.data.id,
                                  type: 'Card',
                                  paymentCardId: item.id,
                                },
                                asyncToken,
                              );
                            }}
                            style={[
                              styles.paymentContainerModal,
                              {
                                borderColor:
                                  item.id === cardName
                                    ? 'rgba(162, 28, 20, 0.3)'
                                    : '#fff',
                              },
                            ]}>
                            <View style={styles.leftContainerPayment}>
                              <View style={{ marginRight: 12 }}>
                                {mainIcon('Bank Card')}
                              </View>
                              <Text style={styles.textStylePay}>
                                Card **** {item.lastDigits}
                              </Text>
                            </View>
                            <View style={styles.radioContainerPayment}>
                              <RadioButton
                                innerColor="#A11C14"
                                outerColor="#A11C14"
                                isSelected={item.id === cardName ? true : false}
                                onPress={() => {
                                  setCardNameFn(item.id);
                                  setOneTimeCardFn(
                                    `Bank Card **** ${item.lastDigits}`,
                                  );
                                  setPaymentMet('Card');
                                  setPayNameFn('Card');
                                  postDataDeliveryPaymentTypeFn(
                                    {
                                      id: resProceedOrder.data.id,
                                      type: 'Card',
                                      paymentCardId: item.id,
                                    },
                                    asyncToken,
                                  );
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setModalPayment(false);
                      navigation.navigate('NewCardDelivery');
                    }}
                    style={styles.addAddressContainer}>
                    <View style={styles.contentAddContainer}>
                      <PlusIcon />
                      <Text style={styles.textButtonAdd}>Add new card</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </>
            );
          }}
        />
        <ModalDelivery
          visible={modalTime}
          pressCancel={() => {
            setModalTime(false);
          }}
          content={() => {
            return (
              <>
                <View style={styles.headerContainer}>
                  <Text style={styles.textHeaderModal}>Delivery Time</Text>
                </View>
                <View
                  style={{
                    minHeight: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ScrollPicker
                    ref={timeRef}
                    dataSource={dayArray}
                    selectedIndex={1}
                    renderItem={data => {
                      setDayValue(data);
                    }}
                    onValueChange={(data, selectedIndex) => {
                      setDayValue(data);
                    }}
                    wrapperHeight={250}
                    // wrapperWidth={'50%'}
                    wrapperBackground={'#FFFF'}
                    itemHeight={45}
                    highlightColor={'#d8d8d8'}
                    highlightBorderWidth={1}
                    activeItemColor={'#322E2C'}
                    itemColor={'#B4B4B4'}
                  />
                  <ScrollPicker
                    dataSource={hours.map(item => item.value)}
                    selectedIndex={1}
                    renderItem={data => {
                      setTimeValue(data);
                    }}
                    onValueChange={data => {
                      setTimeValue(data);
                    }}
                    wrapperHeight={250}
                    // wrapperWidth={'50%'}
                    wrapperBackground={'#FFFF'}
                    itemHeight={45}
                    highlightColor={'#d8d8d8'}
                    highlightBorderWidth={1}
                    activeItemColor={'#322E2C'}
                    itemColor={'#B4B4B4'}
                  />
                </View>
                {resDeliveryTime.message !== 'success' && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorInput}>
                      {resDeliveryTime.message}
                    </Text>
                  </View>
                )}
                <View style={styles.timeButtonContainer}>
                  <MainButton
                    onPress={async () => {
                      await postDataDeliveryTimeFn(
                        {
                          id: resProceedOrder.data.id,
                          deliveryDay: dayValue.toLocaleLowerCase(),
                          deliveryHour:
                            timeValue === 'Now'
                              ? timeValue.toLocaleLowerCase()
                              : 'set-by-user',
                          deliveryTimeValue:
                            timeValue !== 'Now' && timeValue.split(':')[0],
                          deliveryTimeType:
                            timeValue !== 'Now' && timeValue.split(0, -2).pop(),
                        },
                        asyncToken,
                      );
                    }}
                    buttonText="Add"
                  />
                </View>
              </>
            );
          }}
        />
      </View>
      <ModalError
        visible={!!error?.title}
        pressOK={() => setError({})}
        title={error?.title}
        description={error?.description}
      />
    </SafeAreaView>
  );
};

export default DeliveryDetails;
