import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';

import { Provider } from 'react-redux';
import { store } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './slices/userSlice';
import setAuthToken from './utils/setAuthToken';

import Spinner from './components/global/Spinner';

export default function App() {
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
    <Provider store={store}>
      {loading ? (
        <Spinner />
      ) : (
        <View style={styles.container}>
          <Text style={[tw`text-lg`]}>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
