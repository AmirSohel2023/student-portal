import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) fetchProfile();
    else setLoading(false);
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/profile/');
      setUser(res.data);
    } catch {
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const res = await API.post('/auth/login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    await fetchProfile();
  };

  const register = async (data) => {
    await API.post('/auth/register/', data);
    await login(data.username, data.password);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);