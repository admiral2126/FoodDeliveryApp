import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const ModalKYCVerify = ({visible, onPressOkey}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.modalApproveContainer}>
        <View style={styles.approveContainer}>
          <Text style={styles.headerInfo}>KYC verification needed</Text>
          <Text style={styles.headerTextModal}>
            You will be redirected to an obligatory KYC process verification.
          </Text>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonStyleSkip}
              onPress={onPressOkey}>
              <Text style={styles.textInButton}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalKYCVerify;
