import axios from 'axios';

export const api = axios.create({
  baseURL: `https://api.polish-design.com.tw/api`
});

export default api