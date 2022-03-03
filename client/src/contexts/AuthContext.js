import { createContext, useEffect, useReducer } from 'react';
import rootUrl from '../utils/rootUrl';
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
    if (token) {
      try {
        const res = await fetchInstance(`${rootUrl}/api/user/info`, 'GET', token);
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
    }
  };

  // set axios x-auth-token header and update reducer state if token exists in localStorage
  useEffect(async () => {
    console.log(state);
    await getUserInfo();
  }, []);

  const logIn = async (email, password) => {
    try {
      console.log(email, password);
      const res = await fetchInstance(`${rootUrl}/api/user/login`, 'POST', { email, password });
      const data = await res.json();
      console.log(data);

      await AsyncStorage.setItem('token', data.token);
      await getUserInfo();
    } catch (err) {
      console.log(err.response);
    }
  };

  const register = async (email, name, password) => {
    try {
      const res = await fetchInstance(`${rootUrl}/api/user/register`, 'POST', null, {
        name,
        email,
        password,
      });
      const data = await res.json();
      console.log(data);

      await AsyncStorage.setItem('token', data.token);
      await getUserInfo();
    } catch (err) {
      console.error(err.response);
    }
  };

  const logOut = async (name, email, password) => {
    try {
      await AsyncStorage.setItem('token', null);
      dispatch({
        type: 'LOGOUT',
      });
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
