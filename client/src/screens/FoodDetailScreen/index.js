import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import ReviewDetail from './ReviewDetail';

import fetchInstance from '../../utils/fetchInstance';

const FoodDetailScreen = ({ route, navigation }) => {
  const { foodId } = route.params;
  const [hasTokenExpired, setHasTokenExpired] = useState(false);
  const [foodDetail, setFoodDetail] = useState({});
  const isFocused = useIsFocused();

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

  const fetchFood = async () => {
    try {
      const res = await fetchInstance(`/api/food/${foodId}`, 'GET');
      const data = await res.json();
      setFoodDetail(data.food);
    } catch (err) {
      console.error(err.message);
      showAlert(err.message);
    }
  };

  const handleAddReviewOnPress = async () => {
    try {
      const res = await fetchInstance('/api/user/info', 'GET', token);
      const data = await res.json();

      if (data.message && data.message === 'Authentication Failed') {
        setHasTokenExpired(true);
      } else {
        setUserDetail(data.user);
        setHasTokenExpired(false);
      }
    } catch (error) {
      console.log(error.message);
    }

    if (hasTokenExpired) {
      console.warn('Unable to add review: Your session has expired. Please log in again.');
    } else {
      navigation.navigate('addReview', { foodId });
    }
  };

  useEffect(fetchFood, [foodId, isFocused]);

  return (
    <ScrollView>
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

      <View>
        {foodDetail &&
          foodDetail.reviews &&
          foodDetail.reviews.map((review) => {
            return <ReviewDetail key={review} reviewId={review} />;
          })}
      </View>

      <View style={styles.addReviewArea}>
        <CustomButton
          style={styles.addReviewBtn}
          onPress={handleAddReviewOnPress}
          text="Add Review"
          type="Primary"
        />
      </View>
    </ScrollView>
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
