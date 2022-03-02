import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import { Divider, List, ListItem } from '@ui-kitten/components';
import axios from 'axios';

import DiningHallFoodCard from './DiningHallFoodCard';

const DiningHallDetail = ({ route, navigation }) => {
  const { diningHallId } = route.params;
  const [diningHallDetail, setDiningHallDetail] = useState({});

  const fetchDiningHallDetail = async () => {
    try {
      const res = await axios.get(`/api/diningHall/${diningHallId}`);
      setDiningHallDetail(res.data.diningHallDetails);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(fetchDiningHallDetail, []);

  if (diningHallDetail === undefined) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <Card>
        <Card.Title>Dining Hall: {diningHallDetail.name}</Card.Title>
        <Card.Divider></Card.Divider>
        <View>
          <View>
            {diningHallDetail &&
              diningHallDetail.foods &&
              diningHallDetail.foods.map((foodId) => {
                return <DiningHallFoodCard key={foodId} foodId={foodId} navigation={navigation} />;
              })}
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  diningHallDescription: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  diningHallText: {
    margin: 10,
  },
  diningHallTitle: {
    fontWeight: 'bold',
  },
  foodRating: {
    fontSize: 30,
    margin: 10,
  },
  foodRatingNum: {
    fontSize: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  addReviewArea: {
    alignItems: 'center',
    padding: 50,
  },
  addReviewBtn: {
    margin: 20,
  },
});

export default DiningHallDetail;
