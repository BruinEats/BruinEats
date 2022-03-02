import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';

import { rootUrl } from '../../env';

const ReviewDetail = ({ reviewId }) => {
  const [reviewDetail, setReviewDetail] = useState({});

  const getReviewDetail = async () => {
    try {
      const res = await axios.get(`/api/review/${reviewId}`);
      setReviewDetail(res.data.review);
    } catch (err) {
      console.error(err.message);
    }
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
