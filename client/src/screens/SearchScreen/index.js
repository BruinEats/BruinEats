import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import fetchInstance from '../../utils/fetchInstance';
import FoodList from './FoodList';
import DiningHallList from './DiningHallList';

const SearchScreen = ({ route, navigation }) => {
  const { searchInput, searchId, isToday, todayFoodIds } = route.params;
  const [searchOutputs, setSearchOutputs] = useState([]);

  const showAlert = (description) => {
    Alert.alert(
      'Error',
      description,
      [
        {
          text: 'ok',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const getFoodSearchResult = async () => {
    try {
      const res = await fetchInstance(`/api/search/food_name`, 'POST', null, {
        foodName: searchInput,
      });
      const data = await res.json();

      if (isToday) {
        setSearchOutputs(
          data.food.filter((food) => {
            return todayFoodIds.indexOf(food.id) !== -1;
          })
        );
      } else {
        setSearchOutputs(data.food);
      }
    } catch (err) {
      console.log('error' + err);
    }
  };

  const getDiningHallSearchResult = async () => {
    try {
      const res = await fetchInstance('/api/search/dining_hall', 'POST', null, {
        diningHallName: searchInput,
      });
      const data = await res.json();
      setSearchOutputs(data.diningHalls);
    } catch (err) {
      console.error(err);
    }
  };

  const search = async () => {
    if (searchId === 0) {
      getFoodSearchResult();
    } else {
      getDiningHallSearchResult();
    }
  };

  useEffect(search, [searchInput, searchId]);

  if (searchId !== 0 && searchId !== 1) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (searchId === 0) {
    return <FoodList input={searchInput} data={searchOutputs} navigation={navigation} />;
  } else {
    return <DiningHallList input={searchInput} data={searchOutputs} navigation={navigation} />;
  }
};

export default SearchScreen;
