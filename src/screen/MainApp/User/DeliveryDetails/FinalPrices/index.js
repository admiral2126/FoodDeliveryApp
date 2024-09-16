import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export const FinalPrices = () => {
  const { totalPrices } = useSelector(state => state.main);

  const prices = [
    { title: 'Items Subtotal', price: totalPrices.itemsSubtotal },
    {
      title: 'Service Fee',
      price: totalPrices.totalPriceFee + totalPrices.deliveryPriceFee,
    },
    {
      title: `Delivery (${totalPrices.deliveryDistanceValue} ${totalPrices.deliveryDistanceType})`,
      price: totalPrices.isFreeDelivery ? 0 : totalPrices.delivery,
    },
    { title: 'Total', price: totalPrices.total },
  ];

  const keyExtractor = value => {
    return value.split(' ').join();
  };

  return (
    <View style={styles.pricesContainer}>
      <View>
        <Text style={styles.headerTextType}>Prices</Text>
      </View>
      <View style={styles.pricesWrapper}>
        {prices.map(item => (
          <View style={styles.priceContainer} key={keyExtractor(item.title)}>
            <Text style={styles.priceText}>{item.title}</Text>
            <Text style={styles.priceText}>$ {item.price}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  pricesContainer: {
    marginTop: 40,
  },
  pricesWrapper: {
    paddingTop: 7,
    paddingStart: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Manrope',
  },
});
