export const calculateRestaurantAverageRating = (restaurant, review) => {
  const prevAverageRating = restaurant.averageRating;
  let divideBy = 2;
  if (prevAverageRating === 0) divideBy = 1;
  const averageRating = prevAverageRating || 0;
  const sumWithNewRating = averageRating + review.rating;
  const dividedRating = sumWithNewRating / divideBy;
  const newRating = Number(dividedRating.toFixed(2));
  restaurant.averageRating = newRating;
  return restaurant;
};

// export const calculateRestaurantAverageRating = restaurant => {
//   let totalRatings = 0;
//   const reviews = restaurant.reviews || [];
//   _.forEach(reviews, review => {
//     const rating = Number(review.rating);
//     totalRatings += rating;
//   });
//   return {
//     ...restaurant,
//     averageRating: Number((totalRatings / (reviews.length || 1)).toFixed(2)),
//   };
// };
