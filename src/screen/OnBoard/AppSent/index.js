import React from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';

import styles from './style';

import {setChangeNavigation} from '../../../redux/actions/AuthAction';
import {useAction} from '../../../utils/utils';

import AppSentIcon from '../../../assets/icons/svg-icons/AppSentIcon';

import MainButton from '../../../components/MainButton';

const AppSent = ({navigation}) => {
  const setNavigation = useAction(setChangeNavigation);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.contentContainer}>
          <View style={styles.containerIcon}>
            <AppSentIcon />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Application sent!</Text>
            <Text style={styles.subTitleText}>
              After successful verification we will notify you by email when you
              can start your work.
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            onPress={() => {
              setNavigation(true);
            }}
            buttonText="Got it"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppSent;
