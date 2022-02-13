import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

export const login = createAsyncThunk('users/login', async (email, password) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/user/login', body, config);
    await AsyncStorage.setItem('token', res.data.token);
    // TODO : set alert
    return res.data;
  } catch (err) {
    const errors = err.response.data;
    // TODO : set alert
  }
});

export const loadUser = createAsyncThunk('/api/user/info', async (token) => {
  try {
    const res = await axios.get('/api/user/load');
    // TODO : set alert
    return res.data;
  } catch (err) {
    const errors = err.response.data;
    // TODO : set alert
  }
});

export const logout = createAsyncThunk('users/logout', async (token) => {
  try {
    await AsyncStorage.setItem('token', null);
    // TODO : set alert
    return;
  } catch (err) {
    const errors = err.response.data;
    // TODO : set alert
  }
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      setAuthToken(action.payload.token);
      state.loading = false;
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
    [loadUser.pending]: (state) => {
      state.loading = true;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
    },
    [loadUser.rejected]: (state) => {
      state.loading = false;
    },
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.loading = false;
    },
    [logout.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// export const { setMessage } = userSlice.actions;
export default userSlice.reducer;
