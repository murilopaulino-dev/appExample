/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.modifyReview = functions.firestore
    .document("reviews/{reviewId}")
    .onWrite(async (change) => {
      const newDocument = change.after.exists ? change.after.data() : null;

      const restaurantId = newDocument.restaurant;
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
        const averageRating = ratingSum / reviews.size;
        await restaurantQuery.update({ averageRating });
      }
    });

