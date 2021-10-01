import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { store } from '../../redux/store';
import Screen from '../../components/Screen';
import { generateNewId } from '../../utils';
import RestaurantService from '../../services/RestaurantService';
import routes from '../../navigation/routes';

const createNewReview = (comment, rating) => {
  const user = store.getState().user;
  return {
    id: generateNewId(),
    user: user.id,
    comment,
    date: new Date(),
    rating,
  };
};

const NewReview = ({ route, navigation }) => {
  const restaurant = route.params.restaurant;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState();

  const onSave = useCallback(async () => {
    const newRestaurant = {
      ...restaurant,
      reviews: [
        ...(restaurant.reviews || []),
        createNewReview(comment, rating),
      ],
    };
    await RestaurantService.saveRestaurant(newRestaurant);
    navigation.navigate(routes.HOME);
  }, [restaurant, comment, rating, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Save" onPress={onSave} />,
    });
  }, [navigation, onSave]);

  return (
    <Screen>
      <View style={{ flexDirection: 'row' }}>
        <Text>Comment</Text>
        <TextInput value={comment} onChangeText={setComment} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Rating</Text>
        <TextInput value={rating} onChangeText={setRating} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
      </View>
    </Screen>
  );
};

export default React.memo(NewReview);
