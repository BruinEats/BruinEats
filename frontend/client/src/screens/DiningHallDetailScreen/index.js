import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import { Input, Button } from '@ui-kitten/components';

import fetchInstance from '../../utils/fetchInstance';
import DiningHallFoodCard from './DiningHallFoodCard';

const DiningHallDetail = ({ route, navigation }) => {
  const { diningHallId, isToday, foods } = route.params;
  const [diningHallDetail, setDiningHallDetail] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

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

  const fetchDiningHallDetail = async () => {
    try {
      const res = await fetchInstance(`/api/diningHall/${diningHallId}`, 'GET');
      const data = await res.json();
      setDiningHallDetail(data.diningHallDetails);

      if (isToday) {
        setFoodList(foods.filter((foodId, index) => foods.indexOf(foodId) === index));
      } else {
        setFoodList(data.diningHallDetails.foods);
      }
    } catch (err) {
      console.error(err.message);
      showAlert(err.message);
    }
  };

  const handleSearchInput = async () => {
    if (diningHallDetail === undefined) {
      return;
    }

    try {
      const res = await fetchInstance(`/api/search/food_name`, 'POST', null, {
        foodName: searchInput,
        diningHallName: diningHallDetail.name,
      });
      const data = await res.json();

      if (isToday) {
        setFoodList(
          data.food.map((food) => food.id).filter((foodId) => foods.indexOf(foodId) !== -1)
        );
      } else {
        setFoodList(data.food.map((food) => food.id));
      }
    } catch (err) {
      console.log(err);
      console.error(err.message);
      showAlert(err.message);
    }
  };

  useEffect(fetchDiningHallDetail, [diningHallId]);

  if (diningHallDetail === undefined) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <ScrollView>
        <Input
          placeholder="Search For Food"
          value={searchInput}
          onChangeText={(nextValue) => setSearchInput(nextValue)}
        />
        <Button style={styles.diningHallSearchBtn} onPress={handleSearchInput}>
          Search
        </Button>
        <Card>
          <Card.Title>Dining Hall: {diningHallDetail.name}</Card.Title>
          <Card.Divider></Card.Divider>
          <View>
            <View>
              {foodList.map((foodId) => {
                return <DiningHallFoodCard key={foodId} foodId={foodId} navigation={navigation} />;
              })}
            </View>
          </View>
        </Card>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  diningHallDescription: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  diningHallSearchBtn: {
    marginTop: 5,
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
