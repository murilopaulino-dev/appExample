import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import routes from '../../navigation/routes';
import { COLORS } from '../../constants';
import { Rating } from 'react-native-ratings';

const Restaurant = ({ restaurant, style, nameStyle }) => {
  const navigation = useNavigation();
  const { name, averageRating, id } = restaurant;

  const openRestaurant = () => {
    navigation.navigate(routes.RESTAURANT_DETAILS, { restaurantId: id });
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={openRestaurant}>
      <Text style={[styles.name, nameStyle]}>{name}</Text>
      <Rating
        fractions={2}
        readonly
        startingValue={averageRating}
        imageSize={25}
        tintColor={style?.backgroundColor || COLORS.backgroundColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
  },
});

export default React.memo(Restaurant);
