import React, {useEffect} from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';

import styles from './style';

import {useAction} from '../../../../utils/utils';
import {
  getDataProfile,
  setAllState,
  setAllCity,
  setCountry,
  setCity,
  getDataAllState,
} from '../../../../redux/actions/AuthAction';

import HeaderProfile from '../../../../components/HeaderProfile';

const Profile = ({navigation}) => {
  const {resProfile, asyncToken, asyncRole} = useSelector(state => state.auth);

  const clearAllState = useAction(setAllState);
  const clearAllCity = useAction(setAllCity);
  const setCountryFn = useAction(setCountry);
  const setCityFn = useAction(setCity);
  const getDataProfileFn = useAction(getDataProfile);
  const getAllState = useAction(getDataAllState);

  const profileData = resProfile?.data?.user;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <HeaderProfile
          backButton={true}
          navigationTitle="Profile"
          navigatePress={() => {
            navigation.navigate('MainScreen');
            navigation.openDrawer();
          }}
          button="Edit"
          onPress={() => {
            getDataProfileFn(asyncToken, asyncRole);
            clearAllState('');
            clearAllCity('');
            setCountryFn('');
            setCityFn('');
            navigation.navigate('EditProfile');
            asyncRole === 'courier' ? getAllState() : null;
          }}
        />
        <View style={{flex: 1}}>
          <View style={styles.containerProfileLine}>
            <Text style={styles.titleLine}>First Name</Text>
            <Text style={styles.subTitleLine}>{profileData?.firstName}</Text>
          </View>
          <View style={styles.containerProfileLine}>
            <Text style={styles.titleLine}>Last Name</Text>
            <Text style={styles.subTitleLine}>{profileData?.lastName}</Text>
          </View>
          <View style={styles.containerProfileLine}>
            <Text style={styles.titleLine}>Date of birth</Text>
            <Text style={styles.subTitleLine}>
              {moment(profileData?.birthdayIso.split('T')[0]).format(
                'D MMMM YYYY',
              )}
            </Text>
          </View>
          <View style={styles.containerProfileLine}>
            <Text style={styles.titleLine}>Phone number</Text>
            <Text style={styles.subTitleLine}>{profileData?.phone}</Text>
          </View>
          <View style={styles.containerProfileLine}>
            <Text style={styles.titleLine}>Email</Text>
            <Text style={styles.subTitleLine}>{profileData?.email}</Text>
          </View>
          {asyncRole === 'courier' ? (
            <>
              <View style={styles.containerProfileLine}>
                <Text style={styles.titleLine}>Country</Text>
                <Text style={styles.subTitleLine}>{profileData?.state}</Text>
              </View>
              <View style={styles.containerProfileLine}>
                <Text style={styles.titleLine}>City</Text>
                <Text style={styles.subTitleLine}>{profileData?.city}</Text>
              </View>
            </>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
