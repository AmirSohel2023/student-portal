import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/auth/refresh/', { refresh });
          localStorage.setItem('access_token', res.data.access);
          err.config.headers.Authorization = `Bearer ${res.data.access}`;
          return axios(err.config);
        } catch {
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(err);
  }
);

export default API;