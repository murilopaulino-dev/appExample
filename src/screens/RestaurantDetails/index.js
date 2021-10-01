import React, { useLayoutEffect } from 'react';
import { Button, Text } from 'react-native';
import _ from 'lodash';
import Screen from '../../components/Screen';
import routes from '../../navigation/routes';
import Review from '../../components/Review';

const RestaurantDetails = ({ route, navigation }) => {
  const restaurant = route.params;
  console.log('restaurant', restaurant);
  const { name, reviews } = restaurant;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Edit" onPress={() => navigation.navigate(routes.NEW_EDIT_RESTAURANT, restaurant)} />,
    });
  }, [navigation, restaurant]);

  return (
    <Screen>
      <Text>{name}</Text>
      {_.map(reviews, (review, index) => (
        <Review key={`review-${index}`} restaurant={restaurant} review={review} />
      ))}
    </Screen>
  );
};

export default React.memo(RestaurantDetails);
