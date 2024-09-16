import React, {useState} from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

const ModalError = ({visible = false, pressOK, title, description}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.insideContainer}>
          <Text style={styles.headerTextModal}>{title}</Text>
          <Text style={styles.headerDescriptionModal}>{description}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={pressOK}
          >
            <Text style={styles.buttonText}>Ok, got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalError;
