import axios from 'axios';

const api = axios.create({
  baseURL: 'https://firestore.googleapis.com/v1/projects/toptalapp-9998d/databases/(default)/documents/',
});

export default api;
