import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import fetchInstance from '../../utils/fetchInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReviewCard from './UsrReviewCard';

const UserDetail = ({ navigation }) => {
  const [userDetail, setUserDetail] = useState({});
  const [reviewDeletion, setReviewDeletion] = useState(0);

  const fetchUserInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    try {
      const res = await fetchInstance('/api/user/info', 'GET', token);
      const data = await res.json();

      setUserDetail(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(fetchUserInfo, [reviewDeletion]);

  return (
    <ScrollView>
      <Card>
        <Card.Title>User: {userDetail.name}</Card.Title>
        <Card.Divider></Card.Divider>
        <View>
          <View>
            <Card>
              <Card.Title>Email: {userDetail.email}</Card.Title>
            </Card>

            <Card>
              <Card.Title>Reviews:</Card.Title>
              <Card.Divider />
              {userDetail &&
                userDetail.reviews &&
                userDetail.reviews.map((reviewId) => {
                  return (
                    <ReviewCard
                      key={reviewId}
                      reviewId={reviewId}
                      navigation={navigation}
                      reviewDeletion={reviewDeletion}
                      setReviewDeletion={setReviewDeletion}
                    />
                  );
                })}
            </Card>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

export default UserDetail;
