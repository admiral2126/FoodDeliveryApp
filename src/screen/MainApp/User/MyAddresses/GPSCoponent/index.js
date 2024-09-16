import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';

import {useAction} from '../../../../../utils/utils';

import {postDataGeoInfoAndTakeData} from '../../../../../redux/actions/MainDriverAction';

import {customStyleMap} from './mapStyle';
import styles from './style';

import LeftArrow from '../../../../../assets/icons/svg-icons/LeftArrow';
import PointGPS from '../../../../../assets/icons/svg-icons/PointGPS';

import MainButton from '../../../../../components/MainButton';

const GPSComponent = ({navigation}) => {
  const {asyncToken} = useSelector(state => state.auth);

  const {geoInfo} = useSelector(state => state.driver);

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
    <View style={styles.adressWithMapContainer}>
      {location ? (
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={true}
          userInterfaceStyle="dark"
          mapType="standard"
          // customMapStyle={customStyleMap}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled={true}
          loadingIndicatorColor="#A21C14"
          showsCompass={false}
          userLocationPriority="high"
          userLocationUpdateInterval={5000}
          followsUserLocation={true}
          showsUserLocation={true}>
          <Marker coordinate={location}>
            <PointGPS />
          </Marker>
        </MapView>
      ) : null}
      <View style={styles.containerBackButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyAddresses');
          }}
          style={styles.arrowContainer}>
          <LeftArrow />
        </TouchableOpacity>
      </View>
      <View style={styles.containerButtonOnMap}>
        <MainButton
          onPress={() => {
            postDataGeoInfoAndTakeDataFn(
              {
                lat: location.latitude,
                lon: location.longitude,
                type: 'google',
              },
              asyncToken,
            );
          }}
          buttonText="Confirm address"
        />
      </View>
    </View>
  );
};

export default GPSComponent;
