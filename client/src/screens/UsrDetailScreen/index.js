import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Rating } from 'react-native-elements';
import { Divider, List, ListItem } from '@ui-kitten/components';
import axios from 'axios';

import UsrReviewCard from './UsrReviewCard';

const UsrDetail = () => {
  const [usrDetail, setusrDetail] = useState({});
  const fetchUsrDetail = async () => {
    // try {
    //   const res = await axios.get(`/api/diningHall/${usrId}`);
    //   setusrDetail(res.data.usrDetails);
    // } catch (err) {
    //   console.error(err.message);
    // }

    fetch(`http://localhost:5000/api/user/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiI2MjA5NDdlNWExN2E2YTY2ZDhhNmUxZGQiLCJpYXQiOjE2NDYyODcyMDYsImV4cCI6MTY0NjI5MDgwNn0.qs2gKIc_covwtp6zuITBaWV80DCRcvQZni4OVyQF_iw`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.warn('Success:', data);
        setusrDetail(data.user)
      })
      .catch((error) => {
        console.warn('Error:', error);

      });
  }

  useEffect(fetchUsrDetail, []); 

  if (usrDetail === undefined) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <Card>
        <Card.Title>User Name: {usrDetail.name}</Card.Title>
        <Card.Divider></Card.Divider>
        <Text>
            User Email: {usrDetail.email}
          </Text>
      </Card>

      <Card>
        <Card.Title>Reviews: </Card.Title>
        <Card.Divider></Card.Divider>
        <View>
          <View>
            {usrDetail &&
              usrDetail.name &&
              usrDetail.reviews.map((reviewId) => {
                return <UsrReviewCard key={reviewId} reviewId={reviewId} />;
              })}
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  diningHallDescription: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  diningHallText: {
    margin: 10,
  },
  diningHallTitle: {
    fontWeight: 'bold',
  },
  foodRating: {
    fontSize: 30,
    margin: 10,
  },
  foodRatingNum: {
    fontSize: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  addReviewArea: {
    alignItems: 'center',
    padding: 50,
  },
  addReviewBtn: {
    margin: 20,
  },
});

export default UsrDetail;
