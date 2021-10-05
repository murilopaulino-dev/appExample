const admin = require("firebase-admin");

const updateRestaurantAverageRating = async (restaurantId) => {
  if (!restaurantId)
    return;
  const restaurantQuery = admin.firestore().collection("restaurants").doc(restaurantId);
  const restaurantDoc = await restaurantQuery.get();
  const restaurant = restaurantDoc.data();
  if (restaurant) {
    const reviews = await admin.firestore().collection("reviews").where("restaurant", "==", restaurantId).get();
    let ratingSum = 0;
    reviews.docs.forEach((reviewDoc) => {
      const review = reviewDoc.data();
      ratingSum += review.rating;
    });
    const averageRating = Number((ratingSum / reviews.size).toFixed(2));
    await restaurantQuery.update({ averageRating });
  }
}

exports.updateRestaurantAverageRating = updateRestaurantAverageRating;
