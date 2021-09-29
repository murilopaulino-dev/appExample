import { get } from '../firebase/getter';

class RestaurantService {
  static getRestaurants() {
    return get('restaurants');
  }
}

export default RestaurantService;
