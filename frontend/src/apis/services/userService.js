import axiosInstance from '../axios';

const getUser = async () => {
  try {
    const res = await axiosInstance.get('/auth/profile');
    return res.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export { getUser };
