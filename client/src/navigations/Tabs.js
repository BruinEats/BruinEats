import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
// import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import AddReviewScreen from '../screens/AddReviewScreen';
import DiningHallDetail from '../screens/DiningHallDetailScreen';
import SearchScreen from '../screens/SearchScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="menu">
      {/* <Tab.Screen name="login" component={SignInScreen} options={{
        tabBarIcon: (tabInfo) => (
                <Ionicons name="home" size={18} color={tabInfo.tintColor} />
              )}}/> */}
      <Tab.Screen
        name="menu"
        component={MenuScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons name="restaurant" size={18} color={tabInfo.tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="addReview"
        component={AddReviewScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons name="add-circle-outline" size={18} color={tabInfo.tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="foodDetail"
        component={FoodDetailScreen}
        options={{
          tabBarIcon: (tabInfo) => <Ionicons name="pizza" size={18} color={tabInfo.tintColor} />,
        }}
      />
      <Tab.Screen name="diningHall" component={DiningHallDetail} />
      <Tab.Screen name="search" component={SearchScreen} />
      {/* <Tab.Screen name="register" component={SignUpScreen} /> */}
    </Tab.Navigator>
  );
};

export default Tabs;
