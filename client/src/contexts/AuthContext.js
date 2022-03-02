import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import rootUrl from '../utils/rootUrl';
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
    console.log(token);
    console.log(state);
    setAuthToken(token);

    if (token) {
      console.log('get user info');
      try {
        const res = await axios.get(`${rootUrl}/api/user/info`);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }

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
    console.log(body);

    console.log(`${rootUrl}/api/user/login`);
    try {
      const res = await axios.post(`${rootUrl}/api/user/login`, body, config);
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }

    dispatch({
      type: 'LOGIN',
      payload: {
        user: res.data.user,
      },
    });

    await AsyncStorage.setItem('token', res.data.token);
  };

  const register = async (email, name, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password });
    console.log(body);

    try {
      const res = await axios.post(`${rootUrl}/api/user/register`, body, config);
      console.log(res.data);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: res.data.user,
        },
      });

      await AsyncStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err.response);
    }
  };

  const logOut = async (name, email, password) => {
    try {
      dispatch({
        type: 'LOGOUT',
      });
      await AsyncStorage.setItem('token', null);
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
