import _ from 'lodash';

export const calculateRestaurantAverageRating = restaurant => {
  let totalRatings = 0;
  const reviews = restaurant.reviews || [];
  _.forEach(reviews, review => {
    const rating = Number(review.rating);
    totalRatings += rating;
  });
  return {
    ...restaurant,
    averageRating: Number((totalRatings / (reviews.length || 1)).toFixed(2)),
  };
};
