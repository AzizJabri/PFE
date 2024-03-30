import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get('access_token');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await api.get('/users/me').then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
            setUser(null);
        });
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // Set user to null in case of error
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    delete api.defaults.headers.common['Authorization']
    await api.post('auth/login', { email, password }).then(res => {
        Cookies.set('access_token', res.data.accessToken, { expires: 1 }, { secure: true });
        Cookies.set('refresh_token', res.data.refreshToken, { expires: 7 }, { secure: true });
        api.defaults.headers.common['Authorization'] = `${res.data.type} ${res.data.accessToken}`
        api.get('/users/me').then((response) => {
            setUser(response.data);
            console.log(response.data)
        });
    })
    setIsLoading(false);
}

  const logout = async () => {
    setIsLoading(true);
    //remove the token from the local storage
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
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