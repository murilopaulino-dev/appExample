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

const RestaurantDetails = ({ route, navigation }) => {
  const restaurantId = route.params.restaurantId;
  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user);

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
    fetchRestaurant();
  }, [fetchRestaurant]);

  useEffect(() => {
    const restaurantReviews = restaurant.reviews;
    const userReviewIndex = _.findIndex(
      restaurantReviews,
      review => review.user === user.id,
    );
    if (userReviewIndex >= 0) {
      setMyReview(restaurantReviews[userReviewIndex]);
      restaurantReviews.splice(userReviewIndex, 1);
      setReviews(restaurantReviews);
    } else {
      setReviews(restaurantReviews);
    }
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
        {myReview && <Review restaurant={restaurant} review={myReview} />}
        {!myReview && !checkIfUserRestaurantOwner(user, restaurant) && (
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
