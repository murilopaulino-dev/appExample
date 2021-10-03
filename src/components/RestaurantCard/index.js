import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import routes from '../../navigation/routes';
import { COLORS } from '../../constants';

const Restaurant = ({ restaurant }) => {
  const navigation = useNavigation();
  const { name, averageRating, id } = restaurant;

  const openRestaurant = () => {
    navigation.navigate(routes.RESTAURANT_DETAILS, { restaurantId: id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={openRestaurant}>
      <Text style={styles.name}>{name}</Text>
      <Text>Rating: {averageRating}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroudColor,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
  },
});

export default React.memo(Restaurant);
