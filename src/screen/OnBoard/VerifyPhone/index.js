import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import messaging from '@react-native-firebase/messaging';

import {
  postDataPhoneNumber,
  postDataVerifyCode,
  setResPostCode,
  setChangeNavigation,
  setTypeUser,
  setDateOfBirth,
} from '../../../redux/actions/AuthAction';

import {postDataPushToken} from '../../../redux/actions/MainDriverAction';

import {useAction} from '../../../utils/utils';

import styles from './style';
import colors from '../../../assets/colors/colors';

import ReSend from '../../../assets/icons/svg-icons/ReSend';

import BackNavigation from '../../../components/NavigationBack';
import HeaderText from '../../../components/HeaderText';
import useAuth from '../../../hooks/useAuth';

const VerifyPhone = ({navigation, route}) => {
  const {userClass, resPostCode, typeUser, phoneSignUp} = useSelector(
    state => state.auth,
  );
  const {confirm} = route.params;
  const {signInWithPhoneNumber} = useAuth();
  const {deviceId} = useSelector(state => state.driver);
  // const postPhone = useAction(postDataPhoneNumber);
  const postVerifyCode = useAction(postDataVerifyCode);
  const setResCode = useAction(setResPostCode);
  const setChangeNav = useAction(setChangeNavigation);
  const clearUserType = useAction(setTypeUser);
  const setDateOfBirthFn = useAction(setDateOfBirth);

  const postDataPushTokenFn = useAction(postDataPushToken);

  const [state, setState] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [reSend, setReSend] = useState(true);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setReSend(true);
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const sendFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const tokenFcm = await messaging().getToken();
      postDataPushTokenFn(
        {fcmPushToken: tokenFcm, deviceId: deviceId},
        resPostCode.data.token,
      );
    } catch (err) {
      //Do nothing
      console.log(err.response.data, 'ERRRR');
    }
  };

  useEffect(() => {
    if (resPostCode.success && typeUser === true) {
      navigation.navigate('SignUpForm');
      sendFcmToken();
      setDateOfBirthFn('');
    } else if (resPostCode.success && typeUser === false) {
      setChangeNav(true);
      sendFcmToken();
    }
  }, [resPostCode, typeUser]);

  useEffect(() => {
    setResCode('');
    clearUserType('');
  }, []);

  const handleResend = async () => {
    try {
      await signInWithPhoneNumber(phoneSignUp);
    } catch (err) {
      console.log('ERR:', err);
    }
    // postPhone({phone: phoneSignUp});
  };
  const onSubmit = async code => {
    try {
      const { user } = await confirm.confirm(code);
      const token = await user.getIdToken();
      postVerifyCode({
        idToken: token,
        type: userClass,
      });
    } catch(e) {
      setResCode({
        success: false,
        message: 'Your code is invalid',
      })
    }
  };
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation
          navigatePress={() => navigation.goBack()}
          navigationTitle="6-digit code"
        />
        <HeaderText
          title="6-digit Code"
          subTitle="Enter 6-digit code we’ve sent to your phone number."
          content={false}
          height={false}
          align={false}
        />
        <View style={styles.otpContainer}>
          {
            <OTPInputView
              style={styles.otpMainStyle}
              pinCount={6}
              code={state}
              onCodeChanged={code => {
                setState(code);
              }}
              keyboardType="number-pad"
              autoFocusOnLoad={false}
              editable
              codeInputFieldStyle={[styles.underlineStyleBase]}
              onCodeFilled={code => onSubmit(code)}
            />
          }
        </View>
        {resPostCode.success === false && (
          <View style={styles.validContainer}>
            <Text style={styles.validText}>{resPostCode.message}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            setReSend(false);
            if (seconds === 0) {
              setMinutes(1);
              setResCode('');
              handleResend();
            }
          }}
          style={styles.reSendContainer}>
          <ReSend color={reSend ? '#A11C14' : '#92877E'} />
          <Text
            style={[
              styles.reSendText,
              {
                color: reSend
                  ? colors.buttonBackGroundColor
                  : colors.textLightBrown,
              },
            ]}>
            Resend code
            {minutes === 0 && seconds === 0 ? null : (
              <Text>
                {' '}
                ({minutes}:{seconds < 10 ? `0${seconds}` : seconds})
              </Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyPhone;
