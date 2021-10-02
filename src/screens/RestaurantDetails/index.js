import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import _ from 'lodash';
import Screen from '../../components/Screen';
import routes from '../../navigation/routes';
import Review from '../../components/Review';
import { useSelector } from 'react-redux';
import {
  checkIfUserIsAdminOrOwner,
  checkIfUserRestaurantOwner,
} from '../../utils/user';
import RestaurantService from '../../services/RestaurantService';
import { useFocusEffect } from '@react-navigation/core';

const RestaurantDetails = ({ route, navigation }) => {
  const restaurantId = route.params.restaurantId;
  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);
  const [highestRatedReview, setHighestRatedReview] = useState();
  const [lowestRatedReview, setLowestRatedReview] = useState();
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user);

  useFocusEffect(
    useCallback(() => {
      fetchRestaurant();
    }, [fetchRestaurant]),
  );

  const fetchRestaurant = useCallback(async () => {
    setLoading(true);
    try {
      const response = await RestaurantService.getRestaurant(restaurantId);
      setRestaurant(response);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  }, [restaurantId]);

  useEffect(() => {
    const restaurantReviews = [];
    let lowestAuxReview = null;
    let highestAuxReview = null;
    _.forEach(restaurant.reviews, review => {
      let addToReviewList = true;
      if (review.user === user.id) setAlreadyReviewed(true);
      if (!highestAuxReview || review.rating > highestAuxReview.rating) {
        addToReviewList = false;
        highestAuxReview = review;
      }
      if (!lowestAuxReview || review.rating < lowestAuxReview.rating) {
        addToReviewList = false;
        lowestAuxReview = review;
      }
      if (addToReviewList) restaurantReviews.push(review);
    });
    setHighestRatedReview(highestAuxReview);
    setLowestRatedReview(lowestAuxReview);
    setReviews(restaurantReviews);
  }, [restaurant, user]);

  useLayoutEffect(() => {
    if (!checkIfUserIsAdminOrOwner(user, restaurant)) return;
    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={loading}
          title="Edit"
          onPress={() =>
            navigation.navigate(routes.EDIT_RESTAURANT, restaurant)
          }
        />
      ),
    });
  }, [navigation, restaurant, user, loading]);

  const openNewReviewPage = () => {
    navigation.navigate(routes.NEW_REVIEW, { restaurant });
  };

  if (loading) return <ActivityIndicator />;

  return (
    <Screen>
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.date?.toLocaleDateString() || 'No date'}</Text>
      <Text>Rating: {restaurant.averageRating}</Text>
      <View style={{ marginTop: 15 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Reviews</Text>
        </View>
        {highestRatedReview && (
          <View>
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Highest Rated Review</Text>
            <Review restaurant={restaurant} review={highestRatedReview} />
          </View>
        )}
        {lowestRatedReview && (
          <View>
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Lowest Rated Review</Text>
            <Review restaurant={restaurant} review={lowestRatedReview} />
          </View>
        )}
        {!alreadyReviewed && !checkIfUserRestaurantOwner(user, restaurant) && (
          <Button title="Write an review!" onPress={openNewReviewPage} />
        )}
        {_.map(reviews, (review, index) => (
          <Review
            key={`review-${index}`}
            restaurant={restaurant}
            review={review}
          />
        ))}
      </View>
    </Screen>
  );
};

export default React.memo(RestaurantDetails);
