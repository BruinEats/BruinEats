import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';
import React from 'react';
import { ApplicationProvider, Layout, Text, useTheme } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './slices/userSlice';
import setAuthToken from './utils/setAuthToken';

import Spinner from './components/global/Spinner';
import Tabs from './src/navigations/Tabs';


const Stack = createNativeStackNavigator();

const ReduxWrapper = () => {
  return (
    <Provider store={store}>
      <Navigator></Navigator>
    </Provider>
  );
};

const Navigator = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      loadUser(token);
    }
  }, []);
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Tabs/>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default ReduxWrapper;
