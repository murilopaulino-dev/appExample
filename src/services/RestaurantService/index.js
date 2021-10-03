import { ORDER } from '../../constants';
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
    return await FirebaseService.save(END_POINT, restaurant);
  }

  static async deleteRestaurant(restaurantId) {
    return await FirebaseService.deleteDoc(END_POINT, restaurantId);
  }
}

export default RestaurantService;
