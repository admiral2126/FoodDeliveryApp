import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './style';

import {useAction} from '../../../../../utils/utils';

import {
  postDataAddCardInOrder,
  setCardNumber,
  setCardHolder,
  setExpiryDate,
  setCvv,
  setResAddCard,
  getDataListAllCreditCard,
} from '../../../../../redux/actions/MainUserAction';

import BackNavigation from '../../../../../components/NavigationBack';
import MainInput from '../../../../../components/MainInput';
import SecondInput from '../../../../../components/SecondTypeMainInput';
import MainButton from '../../../../../components/MainButton';

const AddNewCardPaySec = ({navigation}) => {
  const {asyncToken} = useSelector(state => state.auth);

  const {cardNumber, cardHolderName, expiryDate, cvvCode, resAddCard} =
    useSelector(state => state.main);

  const postDataAddCardInOrderFn = useAction(postDataAddCardInOrder);
  const setCardNumberFn = useAction(setCardNumber);
  const setCardHolderFn = useAction(setCardHolder);
  const setExpiryDateFn = useAction(setExpiryDate);
  const setCvvFn = useAction(setCvv);
  const setResAddCardFn = useAction(setResAddCard);
  const getDataListAllCreditCardFn = useAction(getDataListAllCreditCard);

  const [ident, setIdent] = useState(false);

  useEffect(() => {
    if (resAddCard === 'success') {
      setResAddCardFn('');
      getDataListAllCreditCardFn(asyncToken);
      navigation.goBack();
      setIdent(false);
      setTimeout(() => {
        setCardNumberFn('');
        setCardHolderFn('');
        setExpiryDateFn('');
        setCvvFn('');
      }, 100);
    }
  }, [resAddCard]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        style={styles.mainContainer}
        onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <BackNavigation
            navigationTitle="Add new card"
            navigatePress={() => {
              navigation.goBack();
              setIdent(false);
              setCardNumberFn('');
              setCardHolderFn('');
              setExpiryDateFn('');
              setCvvFn('');
              setResAddCardFn('');
            }}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextStyle}>Add new card</Text>
          </View>
          <View style={styles.mainInputContainer}>
            <View style={styles.inputcontainer}>
              <MainInput
                value={cardNumber}
                onChangeText={e => {
                  setCardNumberFn(e);
                  setResAddCardFn('');
                }}
                label="Card number"
                placeholder="Card number"
                maxLength={16}
                keyboard="number-pad"
              />
            </View>
            {cardNumber.length < 16 && ident ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Card number must be 16 characters
                </Text>
              </View>
            ) : null}
            {resAddCard == 'Payment-Card already added' && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  Payment-Card already added
                </Text>
              </View>
            )}
            <View style={styles.inputcontainer}>
              <MainInput
                value={cardHolderName}
                onChangeText={e => {
                  setCardHolderFn(e);
                  setResAddCardFn('');
                }}
                label="Cardholder name"
                placeholder="Cardholder name"
                keyboard=""
                maxLength={15}
              />
            </View>
            {cardHolderName.length < 1 && ident && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  CardHolder name not be empty
                </Text>
              </View>
            )}
            {resAddCard == 'Please provide valid Card holder full name' && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorInput}>
                  CardHolder name must be in formate (Name Surname)
                </Text>
              </View>
            )}
          </View>
          <View style={styles.rowInputContainer}>
            <SecondInput
              value={expiryDate}
              onChangeText={e => {
                setExpiryDateFn(
                  e.replace(/^(0?[0-9]{2}|1[0-2]{2})([0-9]{2})$/g, '$1/$2'),
                );
                setResAddCardFn('');
              }}
              label="Expiry date"
              placeholder="Expiry date"
              maxLength={5}
              keyboard="number-pad"
            />
            <SecondInput
              value={cvvCode}
              onChangeText={e => setCvvFn(e)}
              label="CVV"
              placeholder="CVV"
              maxLength={3}
              keyboard="number-pad"
            />
          </View>
          {resAddCard == 'wrong card date' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorInput}>Wrong card date</Text>
            </View>
          )}
          {resAddCard === 'Card has been expired' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorInput}>Card has been expired</Text>
            </View>
          )}
          {expiryDate.length < 5 && ident && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorInput}>Expiry date not be valid</Text>
            </View>
          )}
          {cvvCode.length != 3 && ident && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorInput}>CVV must be 3 characters</Text>
            </View>
          )}
          <View style={[styles.buttonContainer]}>
            <MainButton
              onPress={() => {
                setIdent(true);
                postDataAddCardInOrderFn(
                  {
                    cardHolderName: cardHolderName,
                    cardNumber: cardNumber,
                    cardExpiryDate: expiryDate,
                    cardCVV: cvvCode,
                    isOneTimeCard: false,
                  },
                  asyncToken,
                  true,
                );
              }}
              buttonText="Add"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddNewCardPaySec;
