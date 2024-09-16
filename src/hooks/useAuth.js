import React from 'react';
import auth from '@react-native-firebase/auth';

const useAuth = confirm => {
  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation;
  }
  async function confirmCode(code) {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  return {
    signInWithPhoneNumber,
    confirmCode,
  };
};

export default useAuth;
