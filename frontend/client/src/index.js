import React from 'react';
import { ApplicationProvider, Layout, Text, useTheme } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Tabs';

import { AuthProvider } from './contexts/AuthContext';

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
