import React, { useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants';
import ReviewService from '../../services/ReviewService';
import { checkIfUserRestaurantOwner } from '../../utils/user';

const LabelValue = ({ label, value }) => (
  <View style={{ flexDirection: 'row', padding: 3 }}>
    <Text style={{ fontWeight: 'bold' }}>{label}: </Text>
    <Text>{value}</Text>
  </View>
);

const Review = ({ restaurant, review, isOwner }) => {
  const { comment, answer, user, rating, isAnswered } = review || {};
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
    <View style={{ marginTop: 15, padding: 5, borderWidth: 2, borderRadius: 5, borderColor: COLORS.primaryColor, marginHorizontal: 5, backgroundColor: COLORS.secondaryColor }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <LabelValue label="Reviewed by" value={user} />
        <LabelValue label="Ratitng" value={rating} />
      </View>
      <LabelValue label="Comment" value={comment} />
      {isAnswered && <LabelValue label="Answer" value={answer} />}
      {userIsOwner && !isAnswered && (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ padding: 3 }}>Answer</Text>
          <TextInput value={answerField} onChangeText={setAnswerField} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
          {!loading && <Button title="Reply" onPress={replyReview} />}
          {loading && <ActivityIndicator size="small" />}
        </View>
      )}
    </View>
  );
};

export default React.memo(Review);
