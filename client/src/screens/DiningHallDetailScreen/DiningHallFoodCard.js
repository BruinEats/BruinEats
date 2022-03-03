import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import axios from 'axios';

import fetchInstance from '../../utils/fetchInstance';
import rootUrl from '../../utils/rootUrl';

const FoodCard = ({ foodId, navigation }) => {
  const [foodName, setFoodName] = useState('');
  const [foodRating, setFoodRating] = useState(3.0);

  const getFoodName = async () => {
    try {
      const res = await fetchInstance(`/api/food/name/${foodId}`, 'GET');
      const data = await res.json();

      setFoodName(data.name);
      setFoodRating(data.rating);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(getFoodName, [foodId]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('foodDetail', { foodId })}>
      <Card>
        <Card.Title>{foodName}</Card.Title>
        <Text style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          {foodRating !== 0.0 ? 'Rating: ' + Math.round(foodRating * 10) / 10 : 'Rating: Not Rated'}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default FoodCard;
