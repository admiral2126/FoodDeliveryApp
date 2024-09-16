import React from 'react';
import {View, SafeAreaView, StatusBar, ScrollView} from 'react-native';

import styles from './style';

import HeaderText from '../../../components/HeaderText';
import BackNavigation from '../../../components/NavigationBack';

const Privacy = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <BackNavigation
            navigatePress={() => {
              navigation.goBack();
            }}
          />
          <HeaderText
            title="Privacy Policy"
            content={true}
            height={false}
            align={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;
