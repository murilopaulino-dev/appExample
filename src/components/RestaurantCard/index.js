import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import routes from '../../navigation/routes';

const Restaurant = ({ data }) => {
  const navigation = useNavigation();
  const { name, stars, id } = data;

  const openRestaurant = () => {
    navigation.navigate(routes.RESTAURANT_DETAILS, data);
  };

  return (
    <TouchableOpacity onPress={openRestaurant}>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{stars}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Restaurant);
