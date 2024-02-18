
import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://backend-a0j0.onrender.com:5000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
