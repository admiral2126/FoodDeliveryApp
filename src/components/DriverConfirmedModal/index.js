import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';

import styles from './style';
import { useSelector } from 'react-redux';
import { useAction } from '../../utils/utils';
import { setDriverConfirmed } from '../../redux/actions/MainDriverAction';

export const DriverConfirmedModal = () => {
  const { isDriverConfirmed } = useSelector(state => state.driver);
  const { resProfile } = useSelector(state => state.auth);
  const setIsDriverConfirmed = useAction(setDriverConfirmed);

  const handleCloseModal = () => {
    setIsDriverConfirmed({ ...isDriverConfirmed, success: true });
  };

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={
        resProfile?.data?.courier?.isKycCompleted &&
        !isDriverConfirmed.isOpenModal
      }>
      <View style={styles.modalApproveContainer}>
        <View style={styles.approveContainer}>
          <Text style={styles.headerInfo}>
            Driver account approval required
          </Text>
          <Text style={styles.headerTextModal}>
            {isDriverConfirmed.message}
          </Text>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonStyleSkip}
              onPress={handleCloseModal}>
              <Text style={styles.textInButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
