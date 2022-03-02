import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import setAuthToken from '../utils/setAuthToken';

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

  // set axios x-auth-token header and update reducer state if token exists in localStorage
  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    setAuthToken(token);

    if (token) {
      const res = await axios.get('/api/user/info');
      console.log(res.data);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: res.data.user,
        },
      });
    }
  }, []);

  const logIn = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/api/user/login', body, config);
      console.log(res.data);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: res.data.user,
        },
      });

      await AsyncStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err.message);
    }
  };

  const register = async (name, email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/api/user/register', body, config);
      console.log(res.data);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: res.data.user,
        },
      });

      await AsyncStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logOut = async (name, email, password) => {
    try {
      dispatch({
        type: 'LOGOUT',
      });
      await AsyncStorage.setItem('token', null);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, logIn, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
