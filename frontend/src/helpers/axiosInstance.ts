
import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:5000/api';
// const baseURL = 'mongodb+srv://yonatandem123:ZOgxg3DlPT05uQnA@cluster0.lstmzvp.mongodb.net:5000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
