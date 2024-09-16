import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';

import styles from './style';

import StarComponent from '../StarComponent';

const ItemRateComponent = ({data, handleRatingClick}) => {
  const [numberOfActiveStars, setActiveStars] = useState(0);

  return (
    <View style={styles.itemRateContainer}>
      <View style={styles.headerItemRateContainer}>
        <View style={styles.itemImageContainer}>
          <Image
            style={styles.itemImageContainer}
            source={{uri: data.MenuItem.image}}
          />
        </View>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemNameText}>{data.MenuItem.name}</Text>
          <Text style={styles.restrauntNameText}>
            Restaurant: {data.MenuItem.Restaurant.name}
          </Text>
        </View>
      </View>
      <StarComponent
        number={numberOfActiveStars}
        pressStar={number => {
          setActiveStars(number);
          handleRatingClick(data.id, number);
        }}
      />
    </View>
  );
};

export default ItemRateComponent;
