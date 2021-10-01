import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import _ from 'lodash';
import Screen from '../../components/Screen';
import routes from '../../navigation/routes';
import Review from '../../components/Review';
import { useSelector } from 'react-redux';
import {
  checkIfUserIsAdminOrOwner,
  checkIfUserRestaurantOwner,
} from '../../utils/user';

const RestaurantDetails = ({ route, navigation }) => {
  const restaurant = route.params;
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const restaurantReviews = restaurant.reviews;
    const userReviewIndex = _.findIndex(restaurantReviews, review => review.user === user.id);
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
      headerRight: () => <Button title="Edit" onPress={() => navigation.navigate(routes.EDIT_RESTAURANT, restaurant)} />,
    });
  }, [navigation, restaurant, user]);

  const openNewReviewPage = () => {
    navigation.navigate(routes.NEW_REVIEW, { restaurant });
  };

  return (
    <Screen>
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.date?.toLocaleDateString() || 'No date'}</Text>
      <View style={{ marginTop: 15 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Reviews</Text>
        </View>
        {myReview && <Review restaurant={restaurant} review={myReview} />}
        {!myReview && !checkIfUserRestaurantOwner(user, restaurant) && <Button title="Write an review!" onPress={openNewReviewPage} />}
        {_.map(reviews, (review, index) => (
          <Review key={`review-${index}`} restaurant={restaurant} review={review} />
        ))}
      </View>
    </Screen>
  );
};

export default React.memo(RestaurantDetails);
