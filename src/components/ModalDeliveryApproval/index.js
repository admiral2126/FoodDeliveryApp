import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const ModalApproveOrder = ({
  visible,
  onPressSwap,
  onPressFullSkip,
  onPressFullCancel,
}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.modalApproveContainer}>
        <View style={styles.approveContainer}>
          <Text style={styles.headerTextModal}>Order confirmation?</Text>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonStyleSwap}
              onPress={onPressSwap}>
              <Text style={styles.textInButton}>Swap on other item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyleSkip}
              onPress={onPressFullSkip}>
              <Text style={styles.textInButton}>Skip and end order</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{marginTop: 15}} onPress={onPressFullCancel}>
            <Text style={styles.textCancelStyle}>Cancel your order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalApproveOrder;
