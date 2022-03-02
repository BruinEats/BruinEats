import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';

const FoodList = ({ input, data, navigation }) => {
  if (data.length === 0) {
    return <View></View>;
  }

  return (
    <ScrollView>
      <Card>
        <Card.Title>Food Search Result For: {input}</Card.Title>
        <Card.Divider></Card.Divider>
        <View>
          <View>
            {data &&
              data.map((food) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('foodDetail', { foodId: food['_id'] })}
                  >
                    <Card>
                      <Card.Title>{food.name}</Card.Title>
                      <Text style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        {food.rating !== 0.0
                          ? 'Rating: ' + Math.round(food.rating * 10) / 10
                          : 'Rating: Not Rated'}
                      </Text>
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

export default FoodList;
