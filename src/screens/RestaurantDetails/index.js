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
import ReviewService from '../../services/ReviewService';

const removeFromReviews = (reviews = [], reviewToRemoveId) => {
  if (!reviews.length || !reviewToRemoveId) return;
  const reviewIndex = _.findIndex(reviews, { id: reviewToRemoveId });
  reviews.splice(reviewIndex, 1);
};

const RestaurantDetails = ({ route, navigation }) => {
  const restaurantId = route.params.restaurantId;
  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
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
      const restaurantResponse = await RestaurantService.getRestaurant(restaurantId);
      const reviewsResponse = await ReviewService.getRestaurantReviews(restaurantId);
      setRestaurant(restaurantResponse);
      setReviews(reviewsResponse);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  }, [restaurantId]);

  useEffect(() => {
    const restaurantReviews = [];
    let lowestAuxReview = null;
    let highestAuxReview = null;
    _.forEach(reviews, review => {
      if (review.user === user.id) setAlreadyReviewed(true);
      if (!highestAuxReview || review.rating > highestAuxReview.rating) {
        highestAuxReview = review;
      }
      if (!lowestAuxReview || review.rating < lowestAuxReview.rating) {
        lowestAuxReview = review;
      }
      restaurantReviews.push(review);
    });
    setHighestRatedReview(highestAuxReview);
    setLowestRatedReview(lowestAuxReview);
    removeFromReviews(restaurantReviews, highestAuxReview?.id);
    removeFromReviews(restaurantReviews, lowestAuxReview?.id);
    setFilteredReviews(restaurantReviews);
  }, [reviews, user]);

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
        {highestRatedReview && (
          <View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Highest Rated Review</Text>
            </View>
            <Review restaurant={restaurant} review={highestRatedReview} />
          </View>
        )}
        {lowestRatedReview && (
          <View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Lowest Rated Review</Text>
            </View>
            <Review restaurant={restaurant} review={lowestRatedReview} />
          </View>
        )}
        {!alreadyReviewed && !checkIfUserRestaurantOwner(user, restaurant) && (
          <Button title="Write an review!" onPress={openNewReviewPage} />
        )}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Reviews</Text>
        </View>
        {_.map(filteredReviews, (review, index) => (
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
