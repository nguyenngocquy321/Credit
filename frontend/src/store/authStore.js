import { create } from 'zustand';
import { login, register } from '@apis/services/authService';
import Cookies from 'js-cookie';
export const useRegisterStore = create((set, get) => ({
  data: {},
  loading: true,
  checkToken: false,
  setData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  register: async () => {
    const { data } = get();
    set({ loading: true, error: null });
    try {
      const res = await register(data);
      Cookies.set('access_token', res.data.access_token, {
        secure: true,
        sameSite: 'Strict',
      });
      Cookies.set('refresh_token', res.data.refresh_token, {
        secure: true,
        sameSite: 'Strict',
      });
      set({ checkToken: true });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },
  loginAuth: async () => {
    const { data } = get();
    set({ loading: true, error: null });
    try {
      const res = await login(data);
      Cookies.set('access_token', res.data.access_token, {
        secure: true,
        sameSite: 'Strict',
      });
      Cookies.set('refresh_token', res.data.refresh_token, {
        secure: true,
        sameSite: 'Strict',
      });
      set({ checkToken: true });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },
}));
