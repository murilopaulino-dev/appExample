/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { updateRestaurantAverageRating } = require("./utils");

admin.initializeApp();

exports.modifyReview = functions.firestore
    .document("reviews/{reviewId}")
    .onWrite(async (change) => {
      const newDocument = change.after.exists ? change.after.data() : null;
      await updateRestaurantAverageRating(newDocument?.restaurant);
    });

exports.deleteReview = functions.firestore
    .document("reviews/{reviewId}")
    .onDelete(async (doc) => {
      const deletedReview = doc.exists ? doc.data() : null
      await updateRestaurantAverageRating(deletedReview?.restaurant);
    });
