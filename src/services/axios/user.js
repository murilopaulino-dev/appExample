import axios from 'axios';
import { AUTH_URL } from '../../constants';

const api = axios.create({
  baseURL: AUTH_URL,
});

export default api;
