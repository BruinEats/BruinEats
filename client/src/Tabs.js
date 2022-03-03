import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './screens/SignInScreen/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
// import HomeScreen from '../screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import FoodDetailScreen from './screens/FoodDetailScreen';
import AddReviewScreen from './screens/AddReviewScreen';
import DiningHallDetail from './screens/DiningHallDetailScreen';
import UserDetail from './screens/UsrDetailScreen';
import SearchScreen from './screens/SearchScreen';
import useAuth from './hooks/useAuth';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const addReviewStack = createStackNavigator();

const Tabs = () => {
  const { isAuthenticated } = useAuth();

  const AddReviewNagivator = () => {
    return (
      <addReviewStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <addReviewStack.Screen name="addReview" component={AddReviewScreen} />
        ) : (
          <addReviewStack.Screen name="login" component={SignInScreen} />
        )}
      </addReviewStack.Navigator>
    );
  };

  return (
    <Tab.Navigator initialRouteName="login">
      <Tab.Screen
        name="login"
        component={SignInScreen}
        options={{
          tabBarIcon: (tabInfo) => <Ionicons name="home" size={18} color={tabInfo.tintColor} />,
        }}
      />
      <Tab.Screen
        name="menu"
        component={MenuScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons name="restaurant" size={18} color={tabInfo.tintColor} />
          ),
        }}
      />
      <Tab.Screen name="add review" component={AddReviewNagivator} />
      <Tab.Screen
        name="foodDetail"
        component={FoodDetailScreen}
        options={{
          tabBarIcon: (tabInfo) => <Ionicons name="pizza" size={18} color={tabInfo.tintColor} />,
        }}
      />
      <Tab.Screen name="diningHall" component={DiningHallDetail} />
      <Tab.Screen name="user" component={UserDetail} />
      <Tab.Screen name="search" component={SearchScreen} />
      <Tab.Screen name="register" component={SignUpScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
