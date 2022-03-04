import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Tabs';

import { AuthProvider } from './contexts/AuthContext';

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
