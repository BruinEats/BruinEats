import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import { Button } from '@ui-kitten/components';
import fetchInstance from '../../utils/fetchInstance';

const ReviewCard = ({ reviewId, navigation, reviewDeletion, setReviewDeletion }) => {
  const [reviewDetail, setReviewDetail] = useState({});
  const [foodName, setFoodName] = useState('');

  const fetchReviewDetail = async () => {
    try {
      const res = await fetchInstance(`/api/review/${reviewId}`, 'GET');
      const data = await res.json();

      setReviewDetail(data.review.review);
      setFoodName(data.review.foodName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewDeletion = async () => {
    try {
      const res = await fetchInstance(`/api/food/${reviewDetail.food}/${reviewId}`, 'DELETE');
      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(fetchReviewDetail, [reviewId]);

  if (reviewDetail === undefined) {
    return (
      <Card>
        <Card.Title>Loading...</Card.Title>
      </Card>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('foodDetail', { foodId: reviewDetail.food })}
    >
      <Card>
        <Card.Title>{foodName}</Card.Title>
        <Card.Divider></Card.Divider>
        <View style={styles.reviewContent}>
          <Text style={styles.reviewComment}>{reviewDetail.comment}</Text>

          <Rating
            showRating
            type="star"
            fractions={1}
            startingValue={reviewDetail.score}
            readonly
            imageSize={40}
            style={{ paddingVertical: 10 }}
          />

          <Button style={styles.deletBtn} status="danger" onPress={handleReviewDeletion}>
            Delete This Review
          </Button>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reviewContent: {
    margin: 20,
  },
  reviewComment: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  deleteBtn: {
    marginTop: 30,
  },
});

export default ReviewCard;
