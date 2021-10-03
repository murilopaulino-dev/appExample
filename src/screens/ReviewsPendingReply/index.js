import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Review from '../../components/Review';
import Screen from '../../components/Screen';
import ReviewService from '../../services/ReviewService';

const ReviewsPendingReply = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ReviewService.getReviewsPendingReply(user.id);
      setReviews(response);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (loading) return <ActivityIndicator />;

  return (
    <Screen>
      {!!reviews.length &&
        _.map(reviews, review => <Review review={review} isOwner />)}
      {!reviews.length && <Text>You have no reviews peding reply</Text>}
    </Screen>
  );
};

export default React.memo(ReviewsPendingReply);
