import { ORDER } from '../../constants';
import { query, save, deleteDoc } from '../firebase';

const END_POINT = 'restaurants';

const DEFAULT_SORT = {
  field: 'stars',
  order: ORDER.DESC,
};

class RestaurantService {
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

  static async saveRestaurant(doc) {
    return await save(END_POINT, doc);
  }

  static async deleteRestaurant(id) {
    return await deleteDoc(END_POINT, id);
  }
}

export default RestaurantService;
