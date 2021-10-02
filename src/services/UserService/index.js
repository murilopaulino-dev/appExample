import { API_KEY } from '../../constants';
import Firebase from '../firebase';
import api from '../axios/user';

const LOGIN_END_POINT = `:signInWithPassword?key=${API_KEY}`;

const FirebaseService = new Firebase(api);

class UserService {
  static async login(loginData = {}) {
    loginData.returnSecureToken = true;
    return await FirebaseService.post(LOGIN_END_POINT, loginData);
  }
}

export default UserService;
