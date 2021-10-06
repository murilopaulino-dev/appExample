import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Review from '../../components/Review';
import Screen from '../../components/Screen';
import ReviewService from '../../services/ReviewService';
import { COLORS } from '../../constants';
import errorHandler from '../../utils/errorHandler';

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
      errorHandler(error);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <Screen style={styles.container}>
      {loading && <ActivityIndicator />}
      {!loading && (
        <>
          {!!reviews.length &&
            _.map(reviews, review => <Review review={review} isOwner />)}
          {!reviews.length && <Text>You have no reviews peding reply</Text>}
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondaryColor,
  },
});

export default React.memo(ReviewsPendingReply);
