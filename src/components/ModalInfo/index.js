import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import colors from '../../assets/colors/colors';

import styles from './style';

const ModalInfo = ({
  visible,
  pressCancel,
  resName,
  resDistance,
  resDistanceType,
  eatType,
  state,
  city,
  street,
  status,
  startTime,
  endTime,
  description,
}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <TouchableOpacity
        onPress={pressCancel}
        style={styles.mainModal}></TouchableOpacity>
      <View style={styles.containerViewDis}>
        <View style={styles.containerInfoContent}>
          <View style={styles.headerContainer}>
            <View numberOfLines={2} style={styles.resNameContainer}>
              <Text style={styles.nameText}>{resName}</Text>
              <Text style={styles.distanceText}>
                {' '}
                (~{resDistance} {resDistanceType})
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.addressResText}>
              {!!street && street + ','} {!!city && city + ','} {state}
            </Text>
            <Text style={styles.workTimeText}>
              Working time: 0{startTime}:00 AM - {endTime}:00 PM
            </Text>
          </View>
          <View style={styles.subElementContainer}>
            {eatType.map((item, index) => (
              <View key={index + 1} style={styles.subElement}>
                <Text style={styles.elementText}>{item.name}</Text>
              </View>
            ))}
          </View>
          {!!description && (
            <View style={{ marginTop: 25 }}>
              <Text style={styles.infoText}>{description}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalInfo;
