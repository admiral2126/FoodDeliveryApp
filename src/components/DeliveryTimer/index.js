import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';

export const DeliveryTimer = () => {
  const today = moment();
  const { deliveryTrackTime } = useSelector(state => state.main);

  const [deliveryTime, setDeliveryTime] = useState(0);

  const deliveryTimeInterval = () => {
    const dateOfDelivery = moment(deliveryTrackTime.expectedDeliveryTime);
    return dateOfDelivery.diff(today, 'seconds');
  };

  useFocusEffect(() => {
    setDeliveryTime(deliveryTimeInterval());
    if (deliveryTime > 0) {
      const timer = setTimeout(() => {
        setDeliveryTime(deliveryTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  return moment()
    .startOf('day')
    .seconds(deliveryTime > 0 ? deliveryTime : 0)
    .format('mm:ss');
};

export const MemoizedDeliveryTimer = React.memo(DeliveryTimer);
