import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7201/api',  // your .NET Core API URL
});

export default axiosInstance;
