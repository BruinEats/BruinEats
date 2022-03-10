import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input } from '@ui-kitten/components';
import axios from 'axios';

import fetchInstance from '../../utils/fetchInstance';
import { ROOT_URL } from '@env';

import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';

const AddReviewScreen = ({ route, navigation }) => {
  const foodId = route.params ? route.params.foodId : '620107ce122592b88a203a9a';
  const [foodDetail, setFoodDetail] = useState({});
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(2.5);
  const [image, setImage] = useState(null);

  const showAlert = (description, type) => {
    Alert.alert(
      type,
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
    const data = { score: rating, comment, food: foodId };
    const token = await AsyncStorage.getItem('token');

    const reviewBody = JSON.stringify(data);
    const ratingBody = JSON.stringify({ rating });

    const formData = new FormData();
    formData.append('image', {
      // @ts-ignore
      uri: image, // Don't replace the file with ''..
      name: 'test.jpg',
      type: 'image/jpg',
    });
    formData.append('data', reviewBody);
    console.log(formData);

    const reviewOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        authentication: token,
      },
      body: formData,
    };

    const ratingOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authentication: token,
      },
      body: ratingBody,
    };

    try {
      const res = await fetch(`${ROOT_URL}/api/food/${foodId}/add_review`, reviewOptions);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err.message);
      // showAlert(err.message);
    }

    try {
      const res = await fetch(`${ROOT_URL}/api/food/${foodId}/add_rating`, ratingOptions);
      const data = await res.json();
      console.log(data);
      showAlert('review added', 'success');
    } catch (err) {
      console.error(err.message);
      showAlert(err.message, 'error');
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
            <Button onPress={() => pickImage()}>Upload Photo</Button>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
