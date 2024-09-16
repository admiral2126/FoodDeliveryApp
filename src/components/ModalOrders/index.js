import React, {useEffect, useState} from 'react';
import {View, Modal, Text, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import {postDataCancelOrder} from '../../redux/actions/MainUserAction';

import {useAction} from '../../utils/utils';

import styles from './style';

const ModalOrders = ({visible, followOrder, pressCancel, allData}) => {
  const [openCancel, setOpenCancel] = useState(false);

  const {asyncToken} = useSelector(state => state.auth);

  const {resCancelOrder} = useSelector(state => state.main);

  const postDataCancelOrderFn = useAction(postDataCancelOrder);

  const restraunInfo = allData?.OrderSuppliers?.map(supp => supp);

  useEffect(() => {
    if (resCancelOrder.success) {
      setOpenCancel(false);
    }
  }, [resCancelOrder]);

  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}>
      <TouchableOpacity
        onPress={pressCancel}
        style={styles.mainModal}></TouchableOpacity>
      <View
        style={[
          styles.containerContentOrder,
          {
            paddingBottom: allData.status === 'delivered' ? 60 : 0,
          },
        ]}>
        <Text style={styles.headerCodeOrder}>Order №{allData.id}</Text>
        <View style={styles.itemMenuListScroll}>
          <ScrollView
            persistentScrollbar={true}
            showsVerticalScrollIndicator={true}
            style={styles.itemMenuListScroll}>
            {restraunInfo?.map(item =>
              item?.OrderSupplierItems.map((supItem, index) => {
                return (
                  <View key={index + 1} style={styles.menuItemContainer}>
                    <View style={styles.menuItemImage}>
                      <Image
                        style={styles.menuItemImage}
                        source={{
                          uri: `${supItem.MenuItem.image}`,
                        }}
                      />
                    </View>
                    <View style={styles.detailInfoContainer}>
                      <Text style={styles.nameItemText}>
                        {supItem.MenuItem.name}
                      </Text>
                      <Text style={styles.otherTextStyle}>
                        ${supItem.MenuItem.price}
                      </Text>
                      <Text style={styles.otherTextStyle}>
                        Quantity: {supItem.amount}
                      </Text>
                      <Text style={styles.otherTextStyle}>
                        Restaurant: {item.Restaurant.name}
                      </Text>
                    </View>
                  </View>
                );
              }),
            )}
          </ScrollView>
        </View>
        <View style={styles.noteContainer}>
          <Text>Note:</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum
            consectetur.
          </Text>
        </View>
        {allData.status === 'delivered' ||
        allData.status === 'canceled' ||
        allData.status === 'refunded' ? null : (
          <View
            style={[
              styles.buttonBottomContainer,
              {
                justifyContent: allData.allSuppliersHaveConfirmed
                  ? 'flex-end'
                  : 'space-between',
              },
            ]}>
            <TouchableOpacity onPress={followOrder} style={styles.followButton}>
              <Text style={styles.textInButton}>Follow the order</Text>
            </TouchableOpacity>

            {!allData.allSuppliersHaveConfirmed && (
              <TouchableOpacity
                onPress={() => {
                  setOpenCancel(true);
                }}
                style={styles.cancelButton}>
                <Text style={styles.textInButtonCancel}>Cancel the order</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={openCancel}>
        <View style={styles.modalCancelContainer}>
          <View style={styles.cancelContainer}>
            <Text style={styles.headerTextModal}>
              Do you want to cancel the order?
            </Text>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => {
                postDataCancelOrderFn({id: allData.id}, asyncToken);
              }}>
              <Text style={styles.cancelText}>Yes, cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.leaveButton}
              onPress={() => {
                setOpenCancel(false);
              }}>
              <Text style={styles.leaveText}>No, leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default ModalOrders;
