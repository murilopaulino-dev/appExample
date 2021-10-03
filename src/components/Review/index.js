import React, { useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import ReviewService from '../../services/ReviewService';
import { checkIfUserRestaurantOwner } from '../../utils/user';

const Review = ({ restaurant, review, isOwner }) => {
  const { comment, answer, user, rating, date, isAnswered } = review || {};
  const [answerField, setAnswerField] = useState('');
  const [loading, setLoading] = useState(false);
  const restaurantUser = useSelector(state => state.user);
  const userIsOwner = isOwner || checkIfUserRestaurantOwner(restaurantUser, restaurant);

  const replyReview = async () => {
    setLoading(true);
    try {
      review.answer = answerField;
      await ReviewService.replyReview(review);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
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
          {!loading && <Button title="Reply" onPress={replyReview} />}
          {loading && <ActivityIndicator size="small" />}
        </View>
      )}
      <Text>Rating: {rating}</Text>
    </View>
  );
};

export default React.memo(Review);
