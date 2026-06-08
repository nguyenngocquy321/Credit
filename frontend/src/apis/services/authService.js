import axiosInstance from '../axios';

const register = (payload) => {
  try {
    const res = axiosInstance.post('auth/register', payload);
    return res;
  } catch (error) {
    throw error;
  }
};
const login = (payload) => {
  try {
    const res = axiosInstance.post('auth/login', payload);
    return res;
  } catch (error) {
    throw error;
  }
};
const logOut = (token) => {
  try {
    const res = axiosInstance.post('auth/logout', { token });
    return res;
  } catch (error) {
    throw error;
  }
};
export { register, login, logOut };
