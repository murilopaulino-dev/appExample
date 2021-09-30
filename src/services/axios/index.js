import axios from 'axios';
import { FIRESTORE_URL } from '../../constants';

const api = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/${FIRESTORE_URL}`,
});

export default api;
