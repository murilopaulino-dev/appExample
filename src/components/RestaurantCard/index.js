import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import routes from '../../navigation/routes';

const Restaurant = ({ data }) => {
  const navigation = useNavigation();
  const { name, averageRating, id } = data;

  const openRestaurant = () => {
    navigation.navigate(routes.RESTAURANT_DETAILS, data);
  };

  return (
    <TouchableOpacity style={{ marginBottom: 10, borderWidth: 1, padding: 5, borderRadius: 10 }} onPress={openRestaurant}>
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{name}</Text>
      <Text>{id}</Text>
      <Text>Rating: {averageRating}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Restaurant);
