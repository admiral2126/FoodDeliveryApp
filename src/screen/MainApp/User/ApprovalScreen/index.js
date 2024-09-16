import React, {useState} from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import styles from './style';

import BackNavigation from '../../../../components/NavigationBack';
import MainButton from '../../../../components/MainButton';
import ModalApproveOrder from '../../../../components/ModalDeliveryApproval';

const ApprovalProces = ({navigation}) => {
  const [modal, setModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.mainContainer]}>
        <StatusBar barStyle="dark-content" />
        <BackNavigation
          navigationTitle="Order №1873472834827"
          navigatePress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.containerTextStatus}>
          <Text style={styles.statusTextStyle}>
            Wait on restraunt confirmation...
          </Text>
        </View>
        <View style={styles.containerMap}>
          <MapView
            style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            userInterfaceStyle="dark"
            mapType="standard"
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            loadingEnabled={true}
            loadingIndicatorColor="#A21C14"
            showsUserLocation={true}
            showsCompass={true}
            userLocationPriority="high"
          />
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            buttonText="Go to Home Page"
            onPress={() => {
              // setModal(true);
              navigation.navigate('MainScreen');
            }}
          />
        </View>
      </View>
      <ModalApproveOrder
        visible={modal}
        onPressFullCancel={() => {
          setModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default ApprovalProces;
