import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
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
import { COLORS } from '../../constants';
import RestaurantCard from '../../components/RestaurantCard';
import Button from '../../components/Button';

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
      const restaurantResponse = await RestaurantService.getRestaurant(
        restaurantId,
      );
      const reviewsResponse = await ReviewService.getRestaurantReviews(
        restaurantId,
      );
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

  const openNewReviewPage = () => {
    navigation.navigate(routes.EDIT_REVIEW, { restaurant });
  };

  const onOpenEditRestaurantPage = () => {
    navigation.navigate(routes.EDIT_RESTAURANT, restaurant);
  };

  return (
    <Screen
      style={{ backgroundColor: COLORS.backgroundColor }}
      horizontal={false}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchRestaurant} />
      }>
      {!loading && (
        <>
          <RestaurantCard
            restaurant={restaurant}
            style={styles.restaurantCard}
            nameStyle={styles.restaurantNameCard}
          />
          {checkIfUserIsAdminOrOwner(user, restaurant) && (
            <Button
              title="Edit Restaurant"
              onPress={onOpenEditRestaurantPage}
              disabled={loading}
            />
          )}
          {!alreadyReviewed &&
            !checkIfUserRestaurantOwner(user, restaurant) && (
              <Button title="Write an review!" onPress={openNewReviewPage} />
            )}
          <View style={styles.marginTopReviewsContainer}>
            {highestRatedReview && (
              <View style={styles.marginTopSection}>
                <View style={styles.alignItemsCenter}>
                  <Text style={styles.sectionTitle}>Highest Rated Review</Text>
                </View>
                <Review restaurant={restaurant} review={highestRatedReview} />
              </View>
            )}
            {lowestRatedReview && (
              <View style={styles.marginTopSection}>
                <View style={styles.alignItemsCenter}>
                  <Text style={styles.sectionTitle}>Lowest Rated Review</Text>
                </View>
                <Review restaurant={restaurant} review={lowestRatedReview} />
              </View>
            )}
            <View style={[styles.alignItemsCenter, styles.marginTopSection]}>
              <Text style={styles.sectionTitle}>Reviews</Text>
            </View>
            {_.map(filteredReviews, (review, index) => (
              <Review
                key={`review-${index}`}
                restaurant={restaurant}
                review={review}
              />
            ))}
          </View>
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 0,
    marginBottom: 15,
  },
  restaurantNameCard: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
  },
  marginTopReviewsContainer: {
    marginTop: 15,
  },
  marginTopSection: {
    marginTop: 10,
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
});

export default React.memo(RestaurantDetails);
