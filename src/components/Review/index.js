import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { COLORS, ERROR_CODES } from '../../constants';
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
import errorHandler from '../../utils/errorHandler';
import UserService from '../../services/UserService';
import { successToast } from '../../utils/toast';

const Review = ({ restaurant, review, isOwner }) => {
  const {
    comment,
    answer,
    user: userReview,
    rating,
    isAnswered,
  } = review || {};
  const [answerField, setAnswerField] = useState('');
  const [saving, setSaving] = useState(false);
  const [userName, setUserName] = useState('');
  const restaurantUser = useSelector(state => state.user);
  const navigation = useNavigation();
  const userIsAdmin = checkIfUserIsAdmin(restaurantUser);
  const userIsOwnerOrAdmin =
    isOwner ||
    userIsAdmin ||
    checkIfUserRestaurantOwner(restaurantUser, restaurant);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchUser = useCallback(async () => {
    let responseUserName = userReview;
    try {
      const response = await UserService.getUser(userReview);
      if (response?.name) responseUserName = response.name;
    } catch (error) {
      console.log('error', error);
    }
    setUserName(responseUserName);
  }, [userReview]);

  const replyReview = async () => {
    setSaving(true);
    try {
      if (!answerField) throw new Error(ERROR_CODES.INSERT_REPLY);
      review.answer = answerField;
      await ReviewService.replyReview(review);
      successToast('Review replied');
    } catch (error) {
      errorHandler(error);
    }
    setSaving(false);
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
          value={userName}
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
          <Button title="Reply" onPress={replyReview} loading={saving} />
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
