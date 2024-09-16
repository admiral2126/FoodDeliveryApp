import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';

import styles from './style';

import BackNavigation from '../../../../components/NavigationBack';

const Information = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation
          navigationTitle="Information"
          navigatePress={() => {
            navigation.goBack();
            navigation.openDrawer();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Information;
