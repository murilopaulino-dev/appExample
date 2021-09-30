import { get, query, save, deleteDoc } from '../firebase';

const END_POINT = 'restaurants';

const DEFAULT_SORT = {
  field: 'name',
  order: 'asc',
};

class RestaurantService {
  static getAllRestaurants() {
    return get(END_POINT);
  }

  static getMyRestaurants(userId, filter = [], sort = DEFAULT_SORT) {
    filter.push(['owner', '==', userId]);
    return query(END_POINT, filter, sort);
  }

  static saveRestaurant(doc) {
    return save(END_POINT, doc);
  }

  static deleteRestaurant(id) {
    return deleteDoc(END_POINT, id);
  }
}

export default RestaurantService;
