import { API_KEY, ROLES } from '../../constants';
import Firebase from '../firebase';
import authApi from '../axios/user';
import firestoreApi from '../axios/firestore';

const LOGIN_END_POINT = `:signInWithPassword?key=${API_KEY}`;

const SIGNUP_END_POINT = `:signUp?key=${API_KEY}`;

const USER_END_POINT = 'users';

const FirebaseAuthService = new Firebase(authApi);

const FirebaseFirestoreService = new Firebase(firestoreApi);

class UserService {
  static async login(loginData = {}) {
    loginData.returnSecureToken = true;
    const userAuth = await FirebaseAuthService.post(LOGIN_END_POINT, loginData);
    if (userAuth) {
      const user = await FirebaseFirestoreService.get(`${USER_END_POINT}/${userAuth.localId}`);
      return { ...user, ...userAuth };
    }
  }

  static async signUp(signUpData = {}) {
    signUpData.returnSecureToken = true;
    const userAuth = await FirebaseAuthService.post(SIGNUP_END_POINT, signUpData);
    if (userAuth) {
      const user = {
        id: userAuth.localId,
        email: userAuth.email,
        role: ROLES.NORMAL,
      };
      await FirebaseFirestoreService.save(USER_END_POINT, user);
      return { ...user, ...userAuth };
    }
  }
}

export default UserService;
