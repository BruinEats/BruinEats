import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input } from '@ui-kitten/components';
import axios from 'axios';

import fetchInstance from '../../utils/fetchInstance';
import rootUrl from '../../utils/rootUrl';

import UploadImage from './ImagePicker';

const AddReviewScreen = ({ route, navigation }) => {
  const foodId = route.params ? route.params.foodId : '620107ce122592b88a203a9a';
  const [foodDetail, setFoodDetail] = useState({});
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(2.5);

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
      showAlert(err.message);
    }
  };

  useEffect(fetchFood, []);

  const handleRating = () => {
    if (isNaN(rating)) {
      console.warn('Input Not Valid: rating should be a number');
      setRating(2.5);
      return;
    }

    const newRating = parseFloat(rating);
    if (newRating >= 0 && newRating <= 5.0) {
      setRating(newRating);
    } else {
      console.warn('Input Not Valid: rating should be between 0 and 5');
      setRating(2.5);
    }
  };

  const handleReviewSubmit = async () => {
    const data = { score: rating, comment, food: foodId, user: 'test@gmail.com' };
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authentication: token ? token : '',
      },
    };
    const reviewBody = JSON.stringify(data);
    const ratingBody = JSON.stringify({ rating });

    try {
      console.log(reviewBody);
      console.log(`${rootUrl}/api/food/${foodId}/add_review`);
      const res = await axios.post(
        `${rootUrl}/api/food/${foodId}/add_review`,
        { data: reviewBody },
        config
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
      showAlert(err.message);
    }

    try {
      const res = await axios.post(`${rootUrl}/api/food/${foodId}/add_rating`, ratingBody, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
      showAlert(err.message);
    }
  };

  if (foodDetail === {}) {
    return <View>Loading...</View>;
  }

  return (
    <>
      <ScrollView>
        <Card>
          <Card.Title>Add Review For {foodDetail.name}</Card.Title>
          <Card.Divider></Card.Divider>
          <View>
            <Input
              style={styles.input}
              value={rating.toString()}
              onBlur={handleRating}
              label="Rating"
              placeholder="A number between 0 to 5"
              onChangeText={(nextValue) => setRating(nextValue)}
            />

            <Input
              style={styles.input}
              value={comment}
              multiline={true}
              textStyle={{ minHeight: 80 }}
              label="Comment"
              placeholder="Place your Comment"
              onChangeText={(nextValue) => setComment(nextValue)}
            />
          </View>

          <View>
            <Text style={styles.addImageTitle}>Upload an image: (optional)</Text>
            <UploadImage />
          </View>

          <Button style={styles.addReviewBtn} onPress={handleReviewSubmit}>
            Submit Review
          </Button>
        </Card>
      </ScrollView>
      {/* ) : (
        <SignInScreen></SignInScreen>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
  },
  addReviewBtn: {
    marginTop: 70,
  },
  addImageTitle: {
    marginTop: 40,
    marginBottom: 30,
    fontWeight: 'bold',
  },
});

export default AddReviewScreen;
