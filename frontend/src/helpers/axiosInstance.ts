
import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:5000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
