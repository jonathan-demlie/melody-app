
import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://backend-a0j0.onrender.com/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
