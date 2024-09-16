import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const GlobalModalInfo = ({
  visible,
  onPressOkey,
  buttonText,
  infoText,
  headerInfo,
}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.modalApproveContainer}>
        <View style={styles.approveContainer}>
          <Text style={styles.headerInfo}>{headerInfo}</Text>
          <View style={styles.mainInfoText}>
            <Text style={styles.headerTextModal}>{infoText}</Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonStyleSkip}
              onPress={onPressOkey}>
              <Text style={styles.textInButton}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GlobalModalInfo;
