import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      console.log(token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        api.get('/users/me/').then((response) => {
            setUser(response.data);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            setUser(null);
            localStorage.removeItem('token')
        });
    } else {
        setIsLoading(false);
        setUser(null);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    await api.post('auth/login', { email, password }).then(res => {
        localStorage.setItem('token', res.data.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        api.get('/users/me/').then((response) => {
            setUser(response.data);
        });
    })
    setIsLoading(false);
}

  const logout = async () => {
    setIsLoading(true);
    //remove the token from the local storage
    localStorage.removeItem('token')
    //remove the token from the axios header
    delete api.defaults.headers.common['Authorization']
    //set the user to null
    setUser(null)
    setIsLoading(false);

  };


  const register = async (email, password) => {
    setIsLoading(true);
    await api.post('auth/register', { email, password })
    setIsLoading(false);
}


const changePassword = async (values) => {
    await api.post('users/set_password/', values).then(res => {
        return res.data
    })
}


  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout,register, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => { return useContext(AuthContext);}