import React from 'react';
// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeManager } from 'react-native-ui-lib';

import { AuthProvider } from './contexts/AuthContext';
import Tabs from './Tabs';

ThemeManager.setComponentTheme('Text', {
  text70: true, // will set the text70 typography modifier prop to be true by default
  grey20: true, // will set the grey10 color modifier prop to be true by default
});

const AppNavigation = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigation;
