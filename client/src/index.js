import React from 'react';
import { ApplicationProvider, Layout, Text, useTheme } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigations/Tabs';

import { AuthProvider } from './context/authContext';

const AppNavigation = () => {
  return (
    <AuthProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ApplicationProvider>
    </AuthProvider>
  );
};

export default AppNavigation;
