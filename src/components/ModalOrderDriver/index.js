import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';

import styles from './style';

import MainButton from '../MainButton/index';

const ModalOrderDriver = ({visible, pressCancel, acceptButton, allData}) => {
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <TouchableOpacity
        onPress={pressCancel}
        style={styles.mainModal}></TouchableOpacity>
      <View style={[styles.containerContentOrder]}>
        <Text style={styles.headerCodeOrder}>
          Order №{allData?.data?.order?.id}
        </Text>
        <View style={{marginTop: 4}}>
          {allData?.data?.suppliers?.map((item, index) => {
            return (
              <Text
                key={index + 1}
                numberOfLines={1}
                style={styles.restrauntItemStyle}>
                {item?.name}{' '}
                <Text style={styles.distanceText}>(~{item?.distance} km)</Text>
              </Text>
            );
          })}
        </View>
        <View style={styles.borderLine}></View>
        <View style={styles.timeAndIncomeContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.headerText}>Time:</Text>
            <Text numberOfLines={1} style={styles.contentText}>
              {/* By 05:30 PM */} {allData?.data?.deliveryTime?.day}{' '}
              {allData?.data?.deliveryTime?.hour == 'set-by-user'
                ? allData?.data?.deliveryTime?.value +
                  ' ' +
                  allData?.data?.deliveryTime?.type
                : allData?.data?.deliveryTime?.hour}
            </Text>
          </View>
          <View style={styles.incomeContainer}>
            <Text style={styles.headerText}>Income:</Text>
            <Text numberOfLines={1} style={styles.contentText}>
              {allData?.data?.income?.symbol} {allData?.data?.income?.amount}
            </Text>
          </View>
        </View>
        <MainButton buttonText="Accept" onPress={acceptButton} />
      </View>
    </Modal>
  );
};

export default ModalOrderDriver;
