import axiosInstance from './axiosInstance';

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post('/User/login', loginData);
  return response.data;
};
