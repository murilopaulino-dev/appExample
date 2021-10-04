import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { store } from '../../redux/store';
import Screen from '../../components/Screen';
import { generateNewId } from '../../utils';
import ReviewService from '../../services/ReviewService';
import { Rating } from 'react-native-ratings';
import { COLORS } from '../../constants';
import {
  getScreenHeightProportion,
  getScreenWidthProportion,
} from '../../utils/screen';
import Field from '../../components/Field';
import Button from '../../components/Button';

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

const getEditingReview = (review, comment, answer, rating) => ({
  ...review,
  comment,
  answer,
  rating,
});

const EditReview = ({ route, navigation }) => {
  const restaurant = route.params.restaurant;
  const review = route.params.review;
  const [comment, setComment] = useState(review?.comment || '');
  const [answer, setAnswer] = useState(review?.answer || '');
  const [rating, setRating] = useState(review?.rating || 3);
  const editingReview = !!review;

  const onSave = useCallback(async () => {
    await ReviewService.saveReview(
      editingReview
        ? getEditingReview(review, comment, answer, rating)
        : createNewReview(comment, rating, restaurant.id),
      restaurant,
    );
    navigation.goBack();
  }, [editingReview, review, comment, answer, rating, restaurant, navigation]);

  return (
    <Screen
      style={styles.container}
      innerStyle={styles.innerContainer}
      scroll={false}>
      <View style={styles.centerContainer}>
        <View style={styles.ratingContainer}>
          <Text>Rating</Text>
          <Rating
            fractions={2}
            startingValue={rating}
            imageSize={25}
            onFinishRating={setRating}
            tintColor={COLORS.backgroudColor}
          />
        </View>
        <Field
          label="Comment"
          value={comment}
          onChangeText={setComment}
          style={styles.marginTop}
        />
        {editingReview && (
          <Field
            label="Answer"
            value={answer}
            onChangeText={setAnswer}
            style={styles.marginTop}
          />
        )}
        <Button title="Save" onPress={onSave} style={styles.marginTop} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    borderRadius: 10,
    padding: 12,
    width: getScreenWidthProportion(0.8),
    height: getScreenHeightProportion(0.45),
    backgroundColor: '#D2D2D2',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginTop: {
    marginTop: 10,
  },
});

export default React.memo(EditReview);
