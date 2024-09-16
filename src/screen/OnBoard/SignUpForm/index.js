import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './style';

import HeaderText from '../../../components/HeaderText';

import {UserForm} from './UserForm';
import {CourierForm} from './CourierForm';
import {useSelector} from 'react-redux';

const SignUpForm = ({navigation}) => {
  const {asyncRole} = useSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={[styles.scrollContainer]}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={[styles.mainContainer]}>
              <StatusBar barStyle="dark-content" />
              <View style={{marginTop: 40}}>
                <HeaderText
                  title="We are glad that you are with us"
                  subTitle="Fill in information below to continue."
                  content={true}
                  height={true}
                  align={true}
                />
              </View>
              {asyncRole === 'client' && <UserForm navigation={navigation} />}
              {asyncRole === 'courier' && (
                <CourierForm navigation={navigation} />
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpForm;
