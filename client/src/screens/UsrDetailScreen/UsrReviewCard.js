import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import axios from 'axios';

const ReviewCard = ({ reviewId, navigation }) => {
  const [foodName, setFoodName] = useState('');
  const [foodRating, setFoodRating] = useState(3.0);

  const getFoodName = async () => {
    // try {
    //   const res = await axios.get(`/api/food/name/${reviewId}`);
    //   setFoodName(res.data.food);
    // } catch (err) {
    //   console.error(err.message);
    // }

    fetch(`http://localhost:5000/api/review/${reviewId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // setFoodRating(rating);
        // setFoodName(name);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(getFoodName, [reviewId]);

  return (
    // <TouchableOpacity onPress={() => navigation.navigate('foodDetail', { reviewId })}>
    //   <Card>
    //     <Card.Title>{foodName}</Card.Title>
    //     <Text style={{ marginLeft: 'auto', marginRight: 'auto' }}>
    //       {foodRating !== 0.0 ? 'Rating: ' + Math.round(foodRating * 10) / 10 : 'Rating: Not Rated'}
    //     </Text>
    //   </Card>
    // </TouchableOpacity>
    <View></View>
  );
};

export default ReviewCard;
