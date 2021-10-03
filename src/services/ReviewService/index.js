import _ from 'lodash';
import { ORDER } from '../../constants';
import { calculateRestaurantAverageRating } from '../../utils/restaurant';
import Firebase from '../firebase';
import api from '../axios/firestore';
import RestaurantService from '../RestaurantService';

const END_POINT = 'reviews';

const DEFAULT_SORT = {
  field: 'rating',
  order: ORDER.DESC,
};

const FirebaseService = new Firebase(api);

class ReviewService {
  static async getReview(reviewId) {
    return await FirebaseService.get(`${END_POINT}/${reviewId}`);
  }

  static async getRestaurantReviews(restaurantId) {
    const filter = [['restaurant', '==', restaurantId]];
    return await FirebaseService.query(END_POINT, filter, DEFAULT_SORT);
  }

  static async getReviewsPendingReply(userId) {
    const restaurantsFilter = [['owner', '==', userId]];
    const userRestaurants = await RestaurantService.getAllRestaurants(restaurantsFilter);
    const restaurantsIds = _.map(userRestaurants, 'id');
    const reviewsFilter = [['restaurant', 'IN', restaurantsIds]];
    return await FirebaseService.query(END_POINT, reviewsFilter);
  }

  static async saveReview(review, restaurant) {
    review.rating = Number(review.rating);
    const restaurantWithAverageRating = calculateRestaurantAverageRating(restaurant, review);
    review.isAnswered = !!review.answer;
    await RestaurantService.saveRestaurant(restaurantWithAverageRating);
    return await FirebaseService.save(END_POINT, review);
  }

  static async replyReview(review) {
    review.isAnswered = true;
    return await FirebaseService.save(END_POINT, review);
  }

  static async deleteReview(reviewId) {
    return await FirebaseService.deleteDoc(END_POINT, reviewId);
  }
}

export default ReviewService;
