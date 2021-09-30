import { get, query } from '../firebase';

const END_POINT = 'restaurants';

const DEFAULT_SORT = {
  field: 'name',
  order: 'asc',
};

class RestaurantService {
  static getAllRestaurants(filter, sort) {
    return get(END_POINT, filter, sort);
  }

  static getMyRestaurants(userId, filter = [], sort = DEFAULT_SORT) {
    filter.push(['owner', '==', userId]);
    return query(END_POINT, filter, sort);
  }
}

export default RestaurantService;
