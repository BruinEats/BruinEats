import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';

const DiningHallList = ({ input, data, navigation }) => {
  if (data.length === 0) {
    return <View></View>;
  }

  return (
    <ScrollView>
      <Card>
        <Card.Title>DiningHall Search Result For: {input}</Card.Title>
        <Card.Divider></Card.Divider>
        <View>
          <View>
            {data &&
              data.map((diningHall) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('diningHall', { diningHallId: diningHall['_id'] })
                    }
                  >
                    <Card>
                      <Card.Title>{diningHall.name}</Card.Title>
                    </Card>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

export default DiningHallList;
