import refreshApi from 'axios';
import { API_KEY, ROLES, TOKEN_URL } from '../../constants';
import Firebase from '../firebase';
import authApi from '../axios/user';
import firestoreApi from '../axios/firestore';

const LOGIN_END_POINT = `:signInWithPassword?key=${API_KEY}`;

const SIGNUP_END_POINT = `:signUp?key=${API_KEY}`;

const DELETE_END_POINT = `:delete?key=${API_KEY}`;

const REFRESH_TOKEN_END_POINT = `token?key=${API_KEY}`;

const USER_END_POINT = 'users';

const FirebaseAuthService = new Firebase(authApi);

const FirebaseFirestoreService = new Firebase(firestoreApi);

export const calcExpirationTime = expiresIn =>
  Date.now() + Number(`${expiresIn}000`);

class AuthUserService {
  static async login(loginData = {}) {
    loginData.returnSecureToken = true;
    const userAuth = await FirebaseAuthService.post(LOGIN_END_POINT, loginData);
    if (userAuth) {
      const idToken = userAuth.idToken;
      const options = {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      };
      const user = await FirebaseFirestoreService.get(
        `${USER_END_POINT}/${userAuth.localId}`,
        options,
      );
      const expiresAt = calcExpirationTime(user.expiresIn);
      return { ...user, ...userAuth, expiresAt };
    }
  }

  static async signUp(signUpData = {}) {
    signUpData.returnSecureToken = true;
    const userAuth = await FirebaseAuthService.post(
      SIGNUP_END_POINT,
      signUpData,
    );
    if (userAuth) {
      const user = {
        id: userAuth.localId,
        email: userAuth.email,
        name: signUpData.name,
        role: ROLES.NORMAL,
      };
      await FirebaseFirestoreService.save(USER_END_POINT, user);
      return { ...user, ...userAuth };
    }
  }

  static async deleteUser(idToken) {
    return FirebaseAuthService.post(DELETE_END_POINT, { idToken });
  }

  static async refreshToken(refreshToken) {
    const refreshData = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    const response = await refreshApi.post(
      `${TOKEN_URL}${REFRESH_TOKEN_END_POINT}`,
      refreshData,
    );
    return response?.data;
  }
}

export default AuthUserService;
