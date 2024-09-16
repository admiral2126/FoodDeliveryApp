import React, { useState, useEffect, useRef } from 'react';
import { View, StatusBar, SafeAreaView, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useSelector } from 'react-redux';

import styles from './style';

import { useAction } from '../../../../../utils/utils';

import {
  getDataAllOrders,
  setResConfirmOrder,
} from '../../../../../redux/actions/MainUserAction';

import DriverIcon from '../../../../../assets/icons/svg-icons/DriverOrderIcon/DriverIcon';

import BackNavigation from '../../../../../components/NavigationBack';
import { useSocket } from '../../../../../hooks/useSocket';
import { MemoizedDeliveryTimer } from '../../../../../components/DeliveryTimer';

const DeliveryTrackMap = ({ navigation }) => {
  const { asyncToken } = useSelector(state => state.auth);
  const { sock, connect } = useSocket();

  const { resSimpleOrder } = useSelector(state => state.main);

  const getDataAllOrdersFn = useAction(getDataAllOrders);
  const setResConfirmOrderFn = useAction(setResConfirmOrder);

  const [clientLocation, setClientLocation] = useState(null);
  const [driverCoords, setDriverCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  sock.on('live-position-of-courier-updated', event => {
    setDriverCoords({ latitude: event.lat, longitude: event.lon });
  });
  const mapRef = useRef();

  useEffect(() => {
    connect(asyncToken);

    setResConfirmOrderFn({});
  }, []);

  const restrauntCoordinate = resSimpleOrder?.OrderSuppliers?.map(item => {
    return {
      latitude: item.Restaurant.lat,
      longitude: item.Restaurant.lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  });

  const driverFullName = () => {
    const name = resSimpleOrder?.Courier?.User?.firstName;
    const lastName = resSimpleOrder?.Courier?.User?.lastName;

    if (!!name && !!lastName) {
      return name + ' ' + lastName;
    }
  };

  // const GOOGLE_API_KEY = 'AIzaSyDVeLnPHwCFDqvXRgY2xYVxfu7itgKq68Q';

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setClientLocation({ latitude, longitude });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation
          navigationTitle={`Order №${resSimpleOrder.id}`}
          navigatePress={() => {
            getDataAllOrdersFn(asyncToken);
            navigation.navigate('MyOrder', {
              trigerModal: true,
              orderId: resSimpleOrder.id,
            });
          }}
        />
        <View style={styles.containerTextStatus}>
          {!resSimpleOrder.allSuppliersHaveConfirmed && (
            <Text style={styles.statusTextStyle}>
              Please wait for confirmed the order
            </Text>
          )}
          {resSimpleOrder.allSuppliersHaveConfirmed && (
            <>
              <Text style={styles.statusTextStyle}>The order is accepted.</Text>
              <Text style={styles.statusTextStyle}>
                Please wait for approval{' '}
                {
                  <Text style={styles.timeText}>
                    ({<MemoizedDeliveryTimer />})
                  </Text>
                }
              </Text>
            </>
          )}
        </View>
        <View style={styles.containerMap}>
          {clientLocation && (
            <MapView
              ref={mapRef}
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              userInterfaceStyle="dark"
              moveOnMarkerPress={true}
              mapType="standard"
              showsMyLocationButton={true}
              initialRegion={{
                latitude: clientLocation.latitude,
                longitude: clientLocation.longitude,
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
              <Marker coordinate={driverCoords}>
                <DriverIcon />
              </Marker>
              {restrauntCoordinate?.length &&
                restrauntCoordinate.map((item, index) => {
                  return <Marker key={index + 1} coordinate={item} />;
                })}
              <Marker coordinate={clientLocation} />
            </MapView>
          )}
        </View>
        {resSimpleOrder.Courier && (
          <View style={styles.customerContainer}>
            {driverFullName() && (
              <Text style={styles.courierName}>{driverFullName()}</Text>
            )}
            <Text style={styles.underNameText}>Your driver</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DeliveryTrackMap;
