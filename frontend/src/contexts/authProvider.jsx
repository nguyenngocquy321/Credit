import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUser } from '@apis/services/userService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('access_token');
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await getUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading }}>{!loading && children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
