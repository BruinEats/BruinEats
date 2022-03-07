import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import axios from 'axios';

import fetchInstance from '../../utils/fetchInstance';
import rootUrl from '../../utils/rootUrl';

import UploadImage from './ImagePicker';

const diningHalls = [
  { name: 'Rendezvous', id: '62010145877028b32701c9fc' },
  { name: 'Feast at Rieber', id: '62010152877028b32701c9ff' },
  { name: 'The Drey', id: '62010159877028b32701ca02' },
  { name: 'Bruin Cafe', id: '62010161877028b32701ca05' },
  { name: 'De Neve', id: '62010522c23b80b6ae530dd7' },
  { name: 'Bruin Plate', id: '6201052ac23b80b6ae530dda' },
  { name: 'Epicuria', id: '62010530c23b80b6ae530ddd' },
  { name: 'Study at Hedrick', id: '6201065115fcccb7b530545b' },
];

const AddReviewScreen = ({ route, navigation }) => {
  const [foodDetail, setFoodDetail] = useState({});
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(2.5);

  // dining hall autocomplete
  const [selectedDiningHall, setSelectedDiningHall] = useState({});
  const [selectedDiningHallName, setSelectedDiningHallName] = useState('');
  const [diningHallList, setDiningHallList] = React.useState(diningHalls);
  const [diningHallAutoBlurred, setDiningHallAutoBlurred] = useState(false);

  // food autocomplete
  const [selectedFoodDetail, setSelectedFoodDetail] = useState({});
  const [selectedFoodName, setSelectedFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [allFoodList, setAllFoodList] = useState([]);
  const [foodAutoBlurred, setFoodAutoBlurred] = useState(false);

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
    const data = { score: rating, comment, food: foodDetail['_id'], user: 'test@gmail.com' };
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
      console.log(`${rootUrl}/api/food/${foodDetail['_id']}/add_review`);
      const res = await axios.post(
        `${rootUrl}/api/food/${foodDetail['_id']}/add_review`,
        { data: reviewBody },
        config
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
      showAlert(err.message);
    }

    try {
      const res = await axios.post(
        `${rootUrl}/api/food/${foodDetail['_id']}/add_rating`,
        ratingBody,
        config
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
      showAlert(err.message);
    }
  };

  const onDiningHallSelect = (index) => {
    setSelectedDiningHall(diningHallList[index]);
    setSelectedDiningHallName(diningHallList[index].name);
  };

  const onChangeDiningHallText = (query) => {
    const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());

    setSelectedDiningHallName(query);
    setDiningHallList(diningHalls.filter((item) => filter(item, query)));
  };

  const handleDiningHallFinish = async () => {
    try {
      const res = await fetchInstance(`/api/search/food_name`, 'POST', null, {
        foodName: '',
        diningHallName: selectedDiningHallName,
      });
      const data = await res.json();

      setAllFoodList(data.food);
      setFoodList(data.food);

      setDiningHallAutoBlurred(true);

      setFoodAutoBlurred(false);
      setSelectedFoodDetail({});
      setSelectedFoodName('');

      setFoodDetail({});
      setComment('');
      setRating(2.5);
    } catch (err) {
      console.error(err.message);
      showAlert(err.message);
    }
  };

  const onFoodSelect = (index) => {
    setSelectedFoodDetail(foodList[index]);
    setSelectedFoodName(foodList[index].name);
  };

  const onChangeFoodtext = (query) => {
    const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());

    setSelectedFoodName(query);
    setFoodList(allFoodList.filter((item) => filter(item, query)));
  };

  const handleFoodFinish = async () => {
    try {
      const res = await fetchInstance(`/api/food/${selectedFoodDetail.id}`, 'GET');
      const data = await res.json();
      setFoodDetail(data.food);
      setFoodAutoBlurred(true);

      setComment('');
      setRating(2.5);
    } catch (err) {
      showAlert(err.message);
    }
  };

  const renderOption = (item) => <AutocompleteItem key={item.id} title={item.name} />;

  return (
    <>
      <ScrollView>
        <Card>
          <Card.Title>Add Review:</Card.Title>
          <Card.Divider></Card.Divider>
          <View>
            <Autocomplete
              style={styles.autocompleteInput}
              placeholder="Select Dining Hall"
              value={selectedDiningHallName}
              onSelect={onDiningHallSelect}
              onFocus={() => setDiningHallAutoBlurred(false)}
              onBlur={handleDiningHallFinish}
              onChangeText={onChangeDiningHallText}
            >
              {diningHallList.map(renderOption)}
            </Autocomplete>

            {diningHallAutoBlurred ? (
              <Autocomplete
                style={styles.autocompleteInput}
                placeholder="Select Food"
                value={selectedFoodName}
                onSelect={onFoodSelect}
                onFocus={() => setFoodAutoBlurred(false)}
                onBlur={handleFoodFinish}
                onChangeText={onChangeFoodtext}
              >
                {foodList.map(renderOption)}
              </Autocomplete>
            ) : (
              <></>
            )}

            {diningHallAutoBlurred && foodAutoBlurred && foodDetail ? (
              <>
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
              </>
            ) : (
              <></>
            )}
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  autocompleteInput: {
    marginBottom: 20,
  },
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
