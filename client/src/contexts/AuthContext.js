import { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fetchInstance from '../utils/fetchInstance';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
  }
};

const AuthContext = createContext({
  ...initialState,
  logIn: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUserInfo = async () => {
    console.log('get user info');
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      try {
        const res = await fetchInstance(`/api/user/info`, 'GET', token);
        const data = await res.json();
        console.log(data);

        dispatch({
          type: 'LOGIN',
          payload: {
            user: data.user,
          },
        });
        console.log(state);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('no token');
    }
  };

  // set axios x-auth-token header and update reducer state if token exists in localStorage
  useEffect(async () => {
    console.log(state);
    await getUserInfo();
  }, []);

  const logIn = async (email, password) => {
    console.log(email, password);
    const res = await fetchInstance(`/api/user/login`, 'POST', null, { email, password });
    const data = await res.json();
    try {
      await AsyncStorage.setItem('token', data.token);
      await getUserInfo();
      return ['login success', 'success'];
    } catch (err) {
      console.error(err);
      return [data.message, 'error'];
    }
  };

  const register = async (email, name, password) => {
    const res = await fetchInstance(`/api/user/register`, 'POST', null, {
      name,
      email,
      password,
    });
    const data = await res.json();
    console.log(data);
    try {
      await AsyncStorage.setItem('token', data.token);
      await getUserInfo();
      return ['register success', 'success'];
    } catch (err) {
      console.error(err);
      return [data.message, 'error'];
    }
  };

  const logOut = async (name, email, password) => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch({
        type: 'LOGOUT',
      });
      console.log(state);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, logIn, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
