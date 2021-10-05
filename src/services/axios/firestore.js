import axios from 'axios';
import { store } from '../../redux/store';
import {
  FIRESTORE_END_POINT,
  FIRESTORE_URL,
  REFRESH_TOKEN_MARGIN_IN_MS,
} from '../../constants';
import AuthUserService, { calcExpirationTime } from '../AuthUserService';
import { setUser } from '../../redux/actions/user';

const api = axios.create({
  baseURL: `${FIRESTORE_URL}${FIRESTORE_END_POINT}`,
});

api.interceptors.request.use(async config => {
  const user = store.getState().user;
  if (user) {
    let token = user.idToken;
    const expiresAt = user.expiresAt;
    const refreshToken = user.refreshToken;
    if (Date.now() >= expiresAt - REFRESH_TOKEN_MARGIN_IN_MS) {
      const userToken = await AuthUserService.refreshToken(refreshToken);
      if (userToken) {
        const newIdToken = userToken.id_token;
        token = newIdToken;
        const newRefreshToken = userToken.refresh_token;
        const newExpiresAt = calcExpirationTime(userToken.expires_in);
        store.dispatch(
          setUser({
            ...user,
            idToken: newIdToken,
            refreshToken: newRefreshToken,
            expiresAt: newExpiresAt,
          }),
        );
      }
    }
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
