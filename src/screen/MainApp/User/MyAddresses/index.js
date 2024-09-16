import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

import {useAction} from '../../../../utils/utils';

import styles from './style';

import BackNavigation from '../../../../components/NavigationBack';

import {
  getDataAddressList,
  setAddress,
  postDataDeleteAddress,
  setResDeleteAddress,
  getDataOneAddressInfo,
} from '../../../../redux/actions/MainUserAction';

import {postDataGeoInfoAndTakeData} from '../../../../redux/actions/MainDriverAction';

import EmptyAdressIcon from '../../../../assets/icons/svg-icons/EmptyAdressIcon';
import PlusIcon from '../../../../assets/icons/svg-icons/PlusIcon';
import TrashIcon from '../../../../assets/icons/svg-icons/TrashIcon';
import EditIcon from '../../../../assets/icons/svg-icons/EditIcon';

const MyAddresses = ({navigation}) => {
  const {asyncToken, asyncRole} = useSelector(state => state.auth);

  const {address, singleAddress, resDeleteAddress} = useSelector(
    state => state.main,
  );

  const {geoInfo} = useSelector(state => state.driver);

  const getDataAddressListFn = useAction(getDataAddressList);
  const postDataDeleteAddressFn = useAction(postDataDeleteAddress);
  const setResDeleteAddressFn = useAction(setResDeleteAddress);

  const getDataOneAddressInfoFn = useAction(getDataOneAddressInfo);

  const [addressId, setAddressId] = useState('');
  const setAddressFn = useAction(setAddress);

  useEffect(() => {
    if (asyncRole == 'client') {
      getDataAddressListFn(asyncToken);
      setResDeleteAddressFn('');
    }
  }, [resDeleteAddress]);

  useEffect(() => {
    if (asyncRole == 'client') {
      if (singleAddress?.length === 0 || singleAddress === undefined) {
        const firstItem =
          address.length &&
          address?.map(
            item =>
              item.apartment + ',' + ' ' + item.street + ',' + ' ' + item.city,
          )[0];
        setAddressFn(firstItem);
      }
    }
  }, [address]);

  const createDeleteAlert = item => {
    Alert.alert(
      'Delete the address',
      'Do you really want to delete this address?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          style: 'destructive',
          text: 'Delete',
          onPress: () => {
            postDataDeleteAddressFn({id: item}, asyncToken);
            if (singleAddress == addressId) {
              setAddressFn('');
            }
          },
        },
      ],
    );
  };

  const postDataGeoInfoAndTakeDataFn = useAction(postDataGeoInfoAndTakeData);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [location]);

  useEffect(() => {
    if (geoInfo.message == 'success') {
      navigation.navigate('AddNewGeneralAddress');
    }
  }, [geoInfo]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.safeArea} contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.mainContainer]}>
          <StatusBar barStyle="dark-content" />
          <BackNavigation
            navigationTitle="My Addresses"
            navigatePress={() => {
              navigation.navigate('MainScreen');
              navigation.openDrawer();
            }}
          />
          {address.length ? (
            <View style={styles.listAddressContainer}>
              {address.map((item, index) => {
                return (
                  <View key={index + 1} style={styles.addressItemContainer}>
                    <View style={styles.infoAddressContainer}>
                      <Text numberOfLines={1} style={styles.headerAddressText}>
                        {item?.label}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={styles.subHeaderAddressText}>
                        {item?.apartment} {item?.street}, {item?.city}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        getDataOneAddressInfoFn({id: item.id}, asyncToken);
                        navigation.navigate('EditAddress');
                      }}>
                      <EditIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        createDeleteAlert(item.id);
                        setAddressId(
                          `${item?.apartment}, ${item?.street}, ${item?.city}`,
                        );
                        `${singleAddress?.apartment}, ${singleAddress?.street}, ${singleAddress?.city}` ==
                          `${item?.apartment}, ${item?.street}, ${item?.city}` &&
                          setAddressFn({});
                      }}>
                      <TrashIcon />
                    </TouchableOpacity>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={() => {
                  postDataGeoInfoAndTakeDataFn(
                    {
                      lat: location?.latitude,
                      lon: location.longitude,
                      type: 'google',
                    },
                    asyncToken,
                  );
                  // navigation.navigate('AddNewGeneralAddress');
                  // navigation.navigate('GPSComponent');
                }}
                style={styles.addAddressContainer}>
                <View style={styles.contentAddContainer}>
                  <PlusIcon />
                  <Text style={styles.textButtonAdd}>Add new address</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyAddressContainer}>
              <EmptyAdressIcon />
              <Text style={styles.underLocateText}>Your have no addresses</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddNewGeneralAddress');
                  // navigation.navigate('GPSComponent');
                  postDataGeoInfoAndTakeDataFn(
                    {
                      lat: location.latitude,
                      lon: location.longitude,
                      type: 'google',
                    },
                    asyncToken,
                  );
                }}
                style={styles.addAddressContainer}>
                <View style={styles.contentAddContainer}>
                  <PlusIcon />
                  <Text style={styles.textButtonAdd}>Add new address</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAddresses;
