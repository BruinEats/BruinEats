import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { Button, Input } from '@ui-kitten/components';

import CustomButton from '../../components/CustomButton';

const AddReviewScreen = ({ route, navigation }) => {
  const { foodId } = route.params;
  const [foodDetail, setFoodDetail] = useState({});
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(2.5);

  const fetchFood = async () => {
    fetch(`http://192.168.244.1:5000/api/food/${foodId}`)
      .then((response) => response.json())
      .then((data) => {
        const newFood = data.food;
        setFoodDetail(newFood);
      })
      .catch((error) => console.warn(error));
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

    fetch(`http://192.168.244.1:5000/api/food/${foodId}/add_review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiI2MjA5NDdlNWExN2E2YTY2ZDhhNmUxZGQiLCJpYXQiOjE2NDU5MjMxMDcsImV4cCI6MTY0NTkyNjcwN30.b1Y0DkLbTxI9cIkZPeNUKdzsNv-AYyiupNSIIeGL9E8`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.warn('Success:', data);
      })
      .catch((error) => {
        console.warn('Error:', error);
      });
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
