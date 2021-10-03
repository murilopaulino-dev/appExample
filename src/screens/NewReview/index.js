import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { store } from '../../redux/store';
import Screen from '../../components/Screen';
import { generateNewId } from '../../utils';
import ReviewService from '../../services/ReviewService';
import { Rating } from 'react-native-ratings';
import { COLORS } from '../../constants';

const createNewReview = (comment, rating, restaurantId) => {
  const user = store.getState().user;
  return {
    id: generateNewId(),
    user: user.id,
    comment,
    date: new Date(),
    rating,
    isAnswered: false,
    restaurant: restaurantId,
  };
};

const NewReview = ({ route, navigation }) => {
  const restaurant = route.params.restaurant;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);

  const onSave = useCallback(async () => {
    await ReviewService.saveReview(
      createNewReview(comment, rating, restaurant.id),
      restaurant,
    );
    navigation.goBack();
  }, [restaurant, comment, rating, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Save" onPress={onSave} />,
    });
  }, [navigation, onSave]);

  console.log('rating', rating);

  return (
    <Screen>
      <View style={{ flexDirection: 'row' }}>
        <Text>Comment</Text>
        <TextInput value={comment} onChangeText={setComment} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Rating</Text>
        <Rating
          fractions={2}
          startingValue={rating}
          imageSize={25}
          onFinishRating={setRating}
          tintColor={COLORS.backgroudColor}
        />
      </View>
    </Screen>
  );
};

export default React.memo(NewReview);
