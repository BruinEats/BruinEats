import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Text, Card, Rating } from 'react-native-elements';

import CustomButton from '../../components/CustomButton';

import ReviewDetail from './ReviewDetail';

const FoodDetailScreen = ({ foodId = '620107ce122592b88a203a9a' }) => {
  const [foodDetail, setFoodDetail] = useState({});

  const fetchFood = async () => {
    try {
      const newFood = await (await axios.get(`http://localhost:5000/api/food/${foodId}`)).data.food;
      setFoodDetail(newFood);
      console.warn(newFood);
    } catch (error) {
      console.warn(error);
    }
  };

  const addReview = () => {
    console.warn('Add Review');
  };

  useEffect(fetchFood, []);

  return (
    <View>
      <Card>
        <Card.Title>Images</Card.Title>
      </Card>

      <Card>
        <Card.Title>Food Previews</Card.Title>
        <Card.Divider></Card.Divider>
        <View>
          <View style={styles.foodDescription}>
            <Text style={styles.foodText}>
              <Text style={styles.foodTitle}>Food Name:</Text> {foodDetail.name}
            </Text>
            <Text style={styles.foodText}>
              <Text style={styles.foodTitle}>Dining Hall:</Text> {foodDetail.diningHall}
            </Text>
          </View>

          <View style={styles.foodDescription}>
            <View>
              <Text style={styles.foodRating}>
                <Rating
                  showRating
                  type="star"
                  fractions={1}
                  startingValue={foodDetail.rating}
                  readonly
                  imageSize={40}
                  style={{ paddingVertical: 10 }}
                />
              </Text>
            </View>
            <View>
              <Text style={styles.foodRatingNum}>(By {foodDetail.numRated} people)</Text>
            </View>
          </View>
        </View>
      </Card>

      <Card>
        <Card.Title>Reviews</Card.Title>
        <Card.Divider></Card.Divider>
        <View>
          {foodDetail &&
            foodDetail.reviews &&
            foodDetail.reviews.map((review) => {
              return <ReviewDetail key={review} reviewId={review} />;
            })}
        </View>
      </Card>

      <View style={styles.addReviewArea}>
        <CustomButton
          style={styles.addReviewBtn}
          onPress={addReview}
          text="Add Review"
          type="Primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodDescription: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  foodText: {
    margin: 10,
  },
  foodTitle: {
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

export default FoodDetailScreen;