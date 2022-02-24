import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React from 'react';
import { ApplicationProvider, Layout, Text, useTheme } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
// import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="menu">
          {/* <Stack.Screen name="home" component={HomeScreen} /> */}
          <Stack.Screen name="menu" component={MenuScreen} />
          {/* <Stack.Screen name="login" component={SignInScreen} /> */}
          {/* <Stack.Screen name="register" component={SignUpScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
