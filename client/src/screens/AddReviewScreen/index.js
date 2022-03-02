import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { Button, Input } from '@ui-kitten/components';
import axios from 'axios';
import rootUrl from '../../utils/rootUrl';

const AddReviewScreen = ({ route, navigation }) => {
  const { foodId } = route.params ? route.params : '';
  const [foodDetail, setFoodDetail] = useState({});
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(2.5);

  const fetchFood = async () => {
    try {
      const res = await axios.get(`${rootUrl}/api/food/${foodId}`);
      setFoodDetail(res.data.food);
    } catch (err) {
      console.error(err.message);
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const reviewBody = JSON.stringify(data);
    const ratingBody = JSON.stringify({ rating });

    try {
      const res = await axios.post(`${rootUrl}/api/food/${foodId}/add_review`, reviewBody, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }

    try {
      const res = await axios.post(`${rootUrl}/api/food/${foodId}/add_rating`, ratingBody, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (foodDetail === {}) {
    return <View>Loading...</View>;
  }

  return (
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

        <Button style={styles.addReviewBtn} onPress={handleReviewSubmit}>
          Submit Review
        </Button>
      </Card>
    </ScrollView>
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
});

export default AddReviewScreen;
