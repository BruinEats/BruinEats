import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import fetchInstance from '../../utils/fetchInstance';

const ReviewDetail = ({ reviewId }) => {
  const [reviewDetail, setReviewDetail] = useState({});

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

  const getReviewDetail = async () => {
    try {
      const res = await fetchInstance(`/api/review/${reviewId}`, 'GET');
      const data = await res.json();

      console.log(reviewId, data);

      if (data && data.review && data.review.review) {
        setReviewDetail(data.review.review);
      }
    } catch (err) {
      console.error(err.message);
      showAlert(err.message);
    }
  };

  useEffect(getReviewDetail, []);

  if (reviewDetail === undefined) {
    return <View></View>;
  }

  return (
    <Card>
      <Card.Title>{reviewDetail.user}</Card.Title>
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
      </View>
    </Card>
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
});

export default ReviewDetail;
