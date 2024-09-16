import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';

import styles from './style';
import colors from '../../../../../assets/colors/colors';

import BackNavigation from '../../../../../components/NavigationBack/index';
import DriverIcon from '../../../../../assets/icons/svg-icons/DriverOrderIcon/DriverIcon';
import {useAction} from '../../../../../utils/utils';
import {setDataPositionStatus} from '../../../../../redux/actions/MainDriverAction';
import {useSocket} from '../../../../../hooks/useSocket';

const MapRouteScreen = ({navigation}) => {
  const {setCourierPosition, sock, connect} = useSocket();
  const {asyncToken} = useSelector(state => state.auth);
  const {allDetailInfo, allDetailInfoCurrentOrder} = useSelector(
    state => state.driver,
  );
  const [location, setLocation] = useState(null);
  const mapRef = useRef();
  const detailInfo = allDetailInfo?.length
    ? allDetailInfo
    : allDetailInfoCurrentOrder;
  const restrauntCoordinate = detailInfo?.data?.suppliers?.map(item => {
    return {
      latitude: item.lat,
      longitude: item.lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  });
  const clientCoordinate = {
    latitude: detailInfo?.data?.deliveryAddress.lat,
    longitude: detailInfo?.data?.deliveryAddress.lon,
  };

  const GOOGLE_API_KEY = 'AIzaSyDVeLnPHwCFDqvXRgY2xYVxfu7itgKq68Q';

  Geolocation.watchPosition(
    position => {
      const {latitude, longitude} = position.coords;
      sock.emit('live-position-of-courier-updated', {
        lat: latitude,
        lon: longitude,
      });
    },
    error => {
      console.log(error.code, error.message);
    },
    {interval: 15000, distanceFilter: 50},
  );

  useEffect(() => {
    connect(asyncToken);
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
  }, [asyncToken]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation
          navigatePress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.containerMap}>
          {location && (
            <MapView
              ref={mapRef}
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              userInterfaceStyle="dark"
              moveOnMarkerPress={true}
              mapType="standard"
              showsMyLocationButton={true}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              loadingEnabled={true}
              loadingIndicatorColor="#A21C14"
              showsCompass={true}
              userLocationPriority="high"
              userLocationUpdateInterval={5000}
              followsUserLocation={true}
              showsUserLocation={true}>
              {/* <Marker coordinate={location}>
                      <UserLocationIcon />
                    </Marker> */}
              <Marker coordinate={location}>
                <DriverIcon />
              </Marker>
              <Marker coordinate={clientCoordinate} />
              {restrauntCoordinate?.length &&
                restrauntCoordinate.map((item, index) => {
                  return (
                    <Marker key={index + 1} coordinate={item}>
                      {/* <View
                            style={{
                              height: 20,
                              width: 20,
                              borderRadius: 50,
                              backgroundColor: 'red',
                            }}></View> */}
                    </Marker>
                  );
                })}
              {!!restrauntCoordinate?.length && (
                <MapViewDirections
                  origin={location}
                  destination={clientCoordinate}
                  apikey={GOOGLE_API_KEY}
                  strokeWidth={4}
                  strokeColor={colors.textDarkGrey}
                  optimizeWaypoints={true}
                  waypoints={restrauntCoordinate}
                  // onReady={result => {
                  //   mapRef.current.fitToCoordinates(result.coordinates, {});
                  // }}
                />
              )}
            </MapView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapRouteScreen;
