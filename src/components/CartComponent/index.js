import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './style';

import SecondCartIcon from '../../assets/icons/svg-icons/SecondCartIcon';

const CartComponent = ({onPress}) => {
  const {allCartItem} = useSelector(state => state.main);
  const [finishCartCount, setFinishCartCount] = useState([]);

  useEffect(() => {
    const resArray = [];
    allCartItem.suppliers?.map(item => resArray.push(item.CartItems));
    setFinishCartCount(resArray.flat(Infinity));
  }, [allCartItem]);

  return (
    <TouchableOpacity onPress={onPress}>
      <SecondCartIcon />
      {allCartItem.length != 0 && (
        <View style={styles.cartActive}>
          <Text style={styles.textNumberItemInCart}>
            {finishCartCount.length}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartComponent;
