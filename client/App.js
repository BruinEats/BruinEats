import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React from 'react';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <SignInScreen />
      {/* <SignUpScreen /> */}
    </View>
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
