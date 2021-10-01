import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import RestaurantService from '../../services/RestaurantService';
import { checkIfUserRestaurantOwner } from '../../utils/user';

const editReviewArray = (reviews, newReview) => {
  const reviewIndex = reviews.findIndex(review => review.id === newReview.id);
  if (reviewIndex < 0) return [];
  reviews[reviewIndex] = newReview;
  return reviews;
};

const Review = ({ restaurant, review }) => {
  const { comment, answer, user, rating, date } = review;
  const restaurantUser = useSelector(state => state.user);
  const userIsOwner = checkIfUserRestaurantOwner(restaurantUser, restaurant);

  const editReview = async (field, newValue) => {
    try {
      const newReview = {
        ...review,
        [field]: newValue,
      };
      const newRestaurant = {
        ...restaurant,
        reviews: editReviewArray(restaurant.reviews, newReview),
      };
      await RestaurantService.saveRestaurant(newRestaurant);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{ marginTop: 15 }}>
      <Text>Review by {user}</Text>
      <Text>Comment: {comment}</Text>
      <Text>Date: {date?.toLocaleDateString() || 'No Date'}</Text>
      {!!answer && <Text>Answer: {answer}</Text>}
      {userIsOwner && !answer && (
        <View style={{ flexDirection: 'row' }}>
          <Text>Answer</Text>
          <TextInput style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
          <Button title="Reply" onPress={() => editReview('answer', 'answerValue')} />
        </View>
      )}
      <Text>Rating: {rating}</Text>
    </View>
  );
};

export default React.memo(Review);
