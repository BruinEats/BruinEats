import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-elements';
import fetchInstance from '../../utils/fetchInstance';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReviewCard from './UsrReviewCard';
import useAuth from '../../hooks/useAuth';
import LogoutButton from '../../components/auth/LogoutButton';

const UserDetail = ({ navigation }) => {
  const [userDetail, setUserDetail] = useState({});
  const [reviewDeletion, setReviewDeletion] = useState(0);
  const [hasTokenExpired, setHasTokenExpired] = useState(false);
  const { isAuthenticated } = useAuth();
  const isFocused = useIsFocused();

  const fetchUserInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    try {
      const res = await fetchInstance('/api/user/info', 'GET', token);
      const data = await res.json();

      if (data.message && data.message === 'Authentication Failed') {
        setHasTokenExpired(true);
      } else {
        setUserDetail(data.user);
        setHasTokenExpired(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(fetchUserInfo, [isFocused, reviewDeletion]);

  if (hasTokenExpired) {
    return (
      <ScrollView>
        <Text>You session has ended. Please log in again to see your profile page</Text>
      </ScrollView>
    );
  } else if (userDetail === undefined) {
    return (
      <ScrollView>
        <Text>Loading...</Text>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <Card>
          <Card.Title>User: {userDetail.name}</Card.Title>
          <Card.Title>Email: {userDetail.email}</Card.Title>
          <LogoutButton />
        </Card>
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
      </ScrollView>
    );
  }
};

export default UserDetail;
