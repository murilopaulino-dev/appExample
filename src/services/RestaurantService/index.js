import { ORDER } from '../../constants';
import { calculateRestaurantAverageRating } from '../../utils/restaurant';
import Firebase from '../firebase';
import api from '../axios/firestore';

const END_POINT = 'restaurants';

const DEFAULT_SORT = {
  field: 'averageRating',
  order: ORDER.DESC,
};

const FirebaseService = new Firebase(api);

class RestaurantService {
  static async getRestaurant(restaurantId) {
    return await FirebaseService.get(`${END_POINT}/${restaurantId}`);
  }

  static async getAllRestaurants(filter = [], order) {
    const sort = {
      field: DEFAULT_SORT.field,
      order: order || DEFAULT_SORT.order,
    };
    return await FirebaseService.query(END_POINT, filter, sort);
  }

  static async saveRestaurant(restaurant) {
    const restaurantWithAverageRating = calculateRestaurantAverageRating(restaurant);
    return await FirebaseService.save(END_POINT, restaurantWithAverageRating);
  }

  static async deleteRestaurant(id) {
    return await FirebaseService.deleteDoc(END_POINT, id);
  }
}

export default RestaurantService;
