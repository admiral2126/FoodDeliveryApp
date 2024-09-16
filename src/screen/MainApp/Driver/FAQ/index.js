import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, ScrollView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import {useAction} from '../../../../utils/utils';

import {
  setAllFaq,
  getDataAllFaq,
} from '../../../../redux/actions/MainDriverAction';

import styles from './style';

import BackNavigation from '../../../../components/NavigationBack';
import DropDownFaq from '../../../../components/DropDownFaq';

const FaqScreen = ({navigation}) => {
  const {asyncToken, asyncRole} = useSelector(state => state.auth);

  const {allFaq} = useSelector(state => state.driver);

  useEffect(() => {
    getDataAllFaqFn({role: asyncRole}, asyncToken);
  }, []);

  const setAllFaqFn = useAction(setAllFaq);
  const getDataAllFaqFn = useAction(getDataAllFaq);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.safeArea} contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <BackNavigation
            navigatePress={() => {
              navigation.goBack();
              navigation.openDrawer();
            }}
          />
          <View style={styles.faqContainer}>
            <Text style={styles.titleFaqText}>FAQ</Text>
            <View>
              <DropDownFaq />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaqScreen;
