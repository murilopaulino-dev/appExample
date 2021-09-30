import React, { useLayoutEffect } from 'react';
import { Button, Text } from 'react-native';
import Screen from '../../components/Screen';
import routes from '../../navigation/routes';

const RestaurantDetails = ({ route, navigation }) => {
  const restaurant = route.params;
  console.log('restaurant', restaurant);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Edit" onPress={() => navigation.navigate(routes.NEW_EDIT_RESTAURANT, restaurant)} />,
    });
  }, [navigation, restaurant]);

  return (
    <Screen>
      <Text>Teste</Text>
    </Screen>
  );
};

export default React.memo(RestaurantDetails);
