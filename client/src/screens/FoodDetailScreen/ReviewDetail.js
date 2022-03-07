import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import fetchInstance from '../../utils/fetchInstance';

const ReviewDetail = ({ reviewId }) => {
  const [reviewDetail, setReviewDetail] = useState({});
  const [userName, setUserName] = useState('');

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
        setUserName(data.review.userName);
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
      <Card.Title>By User: {userName}</Card.Title>
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

        {reviewDetail.imageUrl ? (
          <Image
            style={tw`w-full h-40`}
            source={{
              uri: reviewDetail.imageUrl,
            }}
          />
        ) : (
          <></>
        )}
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
