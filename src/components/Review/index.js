import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../../constants';
import ReviewService from '../../services/ReviewService';
import {
  checkIfUserIsAdmin,
  checkIfUserRestaurantOwner,
} from '../../utils/user';
import { Rating } from 'react-native-ratings';
import { getScreenHeightProportion } from '../../utils/screen';
import Button from '../Button';
import routes from '../../navigation/routes';
import LabelValue from '../LabelValue';

const Review = ({ restaurant, review, isOwner }) => {
  const {
    comment,
    answer,
    user: userReview,
    rating,
    isAnswered,
  } = review || {};
  const [answerField, setAnswerField] = useState('');
  const [loading, setLoading] = useState(false);
  const restaurantUser = useSelector(state => state.user);
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const userIsAdmin = checkIfUserIsAdmin(user);
  const userIsOwnerOrAdmin =
    isOwner ||
    userIsAdmin ||
    checkIfUserRestaurantOwner(restaurantUser, restaurant);

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

  const onOpenEditReviewPage = () => {
    navigation.navigate(routes.EDIT_REVIEW, { restaurant, review });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!userIsAdmin}
      onPress={onOpenEditReviewPage}>
      <View style={styles.header}>
        <LabelValue
          label="Reviewed by"
          value={userReview}
          style={{ width: getScreenHeightProportion(0.45) }}
          numberOfLines={1}
        />
        <Rating
          fractions={2}
          startingValue={rating}
          imageSize={15}
          readonly
          tintColor={COLORS.secondaryColor}
        />
      </View>
      <LabelValue label="Comment" value={comment} />
      {isAnswered && <LabelValue label="Answer" value={answer} />}
      {userIsOwnerOrAdmin && !isAnswered && (
        <View style={styles.ownerContainer}>
          <Text style={styles.answer}>Answer</Text>
          <TextInput
            label="Answer"
            value={answerField}
            onChangeText={setAnswerField}
            style={styles.answerInput}
          />
          {!loading && <Button title="Reply" onPress={replyReview} />}
          {loading && <ActivityIndicator size="small" />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.primaryColor,
    marginHorizontal: 5,
    backgroundColor: COLORS.secondaryColor,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  ownerContainer: { flexDirection: 'row', alignItems: 'center' },
  answer: { padding: 3, fontWeight: 'bold' },
  answerInput: { borderBottomWidth: 1, flex: 1, marginHorizontal: 10 },
});

export default React.memo(Review);
