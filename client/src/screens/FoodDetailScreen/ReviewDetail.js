import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';

const ReviewDetail = ({ reviewId }) => {
  const [reviewDetail, setReviewDetail] = useState({});

  const getReviewDetail = async () => {
    fetch(`http://192.168.244.1:5000/api/review/${reviewId}`)
      .then((response) => response.json())
      .then((data) => {
        const res = data.review;
        setReviewDetail(res);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(getReviewDetail, []);

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
