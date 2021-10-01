import { get, query, save, deleteDoc } from '../firebase';

const END_POINT = 'restaurants';

const DEFAULT_SORT = {
  field: 'name',
  order: 'asc',
};

class RestaurantService {
  static async getAllRestaurants() {
    return await get(END_POINT);
  }

  static async getMyRestaurants(userId, filter = [], sort = DEFAULT_SORT) {
    filter.push(['owner', '==', userId]);
    return await query(END_POINT, filter, sort);
  }

  static async saveRestaurant(doc) {
    return await save(END_POINT, doc);
  }

  static async deleteRestaurant(id) {
    return await deleteDoc(END_POINT, id);
  }
}

export default RestaurantService;
