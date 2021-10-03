import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import ReviewService from '../../services/ReviewService';
import { checkIfUserRestaurantOwner } from '../../utils/user';

const Review = ({ restaurant, review }) => {
  const { comment, answer, user, rating, date, isAnswered } = review || {};
  const [answerField, setAnswerField] = useState('');
  const restaurantUser = useSelector(state => state.user);
  const userIsOwner = checkIfUserRestaurantOwner(restaurantUser, restaurant);

  const editReview = async (field, newValue) => {
    try {
      review[field] = newValue;
      await ReviewService.saveReview(review, restaurant);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{ marginTop: 15 }}>
      <Text>Review by {user}</Text>
      <Text>Comment: {comment}</Text>
      <Text>Date: {date?.toLocaleDateString() || 'No Date'}</Text>
      {isAnswered && <Text>Answer: {answer}</Text>}
      {userIsOwner && !isAnswered && (
        <View style={{ flexDirection: 'row' }}>
          <Text>Answer</Text>
          <TextInput value={answerField} onChangeText={setAnswerField} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
          <Button title="Reply" onPress={() => editReview('answer', answerField)} />
        </View>
      )}
      <Text>Rating: {rating}</Text>
    </View>
  );
};

export default React.memo(Review);
