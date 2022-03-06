import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
const Stack = createNativeStackNavigator();

const Tabs = () => {
  const { isAuthenticated } = useAuth();

  // const AddReviewNagivator = () => {
  //   return (
  //     <addReviewStack.Navigator
  //       screenOptions={{
  //         headerShown: false,
  //       }}
  //     >
  //       {isAuthenticated ? (
  //         <addReviewStack.Screen name="addReview" component={AddReviewScreen} />
  //       ) : (
  //         <addReviewStack.Screen name="login" component={SignInScreen} />
  //       )}
  //     </addReviewStack.Navigator>
  //   );
  // };

  const MenuStackNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="menu">
        <Stack.Screen name="menu" component={MenuScreen} />
        <Stack.Screen name="foodDetail" component={FoodDetailScreen} />
        <Stack.Screen name="diningHall" component={DiningHallDetail} />
        <Stack.Screen name="addReview" component={AddReviewScreen} />
        <Stack.Screen name="search" component={SearchScreen} />
      </Stack.Navigator>
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

      <Tab.Screen name="register" component={SignUpScreen} />

      <Tab.Screen name="bruineats" component={MenuStackNavigator} />

      <Tab.Screen name="user" component={UserDetail} />

      {/* <Tab.Screen
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
      
      <Tab.Screen name="search" component={SearchScreen} /> */}
    </Tab.Navigator>
  );
};

export default Tabs;
