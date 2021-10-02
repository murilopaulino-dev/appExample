import { ORDER } from '../../constants';
import { calculateRestaurantAverageRating } from '../../utils/restaurant';
import { query, save, deleteDoc, get } from '../firebase';

const END_POINT = 'restaurants';

const DEFAULT_SORT = {
  field: 'averageRating',
  order: ORDER.DESC,
};

class RestaurantService {
  static async getRestaurant(restaurantId) {
    return await get(`${END_POINT}/${restaurantId}`);
  }

  static async getAllRestaurants(filter = [], order) {
    const sort = {
      field: DEFAULT_SORT.field,
      order: order || DEFAULT_SORT.order,
    };
    return await query(END_POINT, filter, sort);
  }

  // static async getMyRestaurants(userId, filter = [], sort = DEFAULT_SORT) {
  //   filter.push(['owner', '==', userId]);
  //   return await query(END_POINT, filter, sort);
  // }

  static async saveRestaurant(restaurant) {
    const restaurantWithAverageRating = calculateRestaurantAverageRating(restaurant);
    return await save(END_POINT, restaurantWithAverageRating);
  }

  static async deleteRestaurant(id) {
    return await deleteDoc(END_POINT, id);
  }
}

export default RestaurantService;
