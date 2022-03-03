import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import fetchInstance from '../../utils/fetchInstance';
import rootUrl from '../../utils/rootUrl';

import FoodList from './FoodList';
import DiningHallList from './DiningHallList';

const SearchScreen = ({ route, navigation }) => {
  const { searchInput, searchId } = route.params;
  const [searchOutputs, setSearchOutputs] = useState([]);

  const getFoodSearchResult = async () => {
    try {
      const res = await fetchInstance(`/api/search/food_name`, 'POST', null, {
        foodName: searchInput,
      });
      const data = await res.json();
      setSearchOutputs(data.food);
      console.log(res);
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
