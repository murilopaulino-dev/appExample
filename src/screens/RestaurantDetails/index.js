import React from 'react';
import { Text } from 'react-native';
import Screen from '../../components/Screen';

const RestaurantDetails = ({ route }) => {
  const restaurant = route.params;
  console.log('restaurant', restaurant);
  return (
    <Screen>
      <Text>Teste</Text>
    </Screen>
  );
};

export default React.memo(RestaurantDetails);
