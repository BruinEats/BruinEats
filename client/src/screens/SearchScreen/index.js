import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import FoodList from './FoodList';
import DiningHallList from './DiningHallList';

const SearchScreen = ({ route, navigation }) => {
  const { searchInput, searchId } = route.params;
  const [searchOutputs, setSearchOutputs] = useState([]);

  console.warn(searchInput, searchId);

  const getFoodSearchResult = async () => {
    fetch(`http://192.168.244.1:5000/api/search/food_name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ foodName: searchInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchOutputs(data.food);
      })
      .catch((error) => {
        console.warn('Error:', error);
      });
  };

  const getDiningHallSearchResult = async () => {
    fetch(`http://192.168.244.1:5000/api/search/dining_hall`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ diningHallName: searchInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchOutputs(data.diningHalls);
      })
      .catch((error) => {
        console.warn('Error:', error);
      });
  };

  const search = async () => {
    if (searchId.row === 0) {
      getFoodSearchResult();
    } else {
      getDiningHallSearchResult();
    }
  };

  useEffect(search, [searchInput, searchId]);

  if (!searchId) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (searchId.row === 0) {
    return <FoodList input={searchInput} data={searchOutputs} navigation={navigation} />;
  } else {
    return <DiningHallList input={searchInput} data={searchOutputs} navigation={navigation} />;
  }
};

export default SearchScreen;
