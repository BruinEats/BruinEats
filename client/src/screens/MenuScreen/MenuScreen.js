import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MenuScreen = ({ navigation }) => {
  const [diningHalls, setDiningHalls] = useState([]);

  // useEffect(async () => {
  //   const res = await axios.get('/api/diningHall/all');
  //   console.log(res.data);
  //   setDiningHalls(res.data);
  // }, []);

  return (
    <View style={tw`flex-1`}>
      <AutocompleteDropdown
        dataSet={[
          { id: '1', title: 'Alpha' },
          { id: '2', title: 'Beta' },
          { id: '3', title: 'Alpha' },
        ]}
        textInputProps={{
          placeholder: 'Search for food or dininghall here',
          placeholderTextColor: '#AEAEAE',
          autoCorrect: false,
          autoCapitalize: 'none',
          style: {
            borderRadius: 15,
            backgroundColor: '#fff',
            color: '#000',
            paddingLeft: 15,
          },
        }}
      ></AutocompleteDropdown>
      <View style={tw`flex-row p-2 w-screen`}>
        <Image
          style={tw`w-20 h-20`}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        ></Image>
        <View style={tw`flex-col p-1 w-1/2`}>
          <Text>Name: Beef Tenderloin</Text>
          <Text>Ratings: 5</Text>
          <Text numberOfLines={2} ellipsizeMode="head">
            Top Comment: "You little bithc will like this motherfucer"
          </Text>
        </View>
      </View>
      <ScrollView
        style={tw`mx-0.5`}
        suggestionsListContainerStyle={{
          backgroundColor: '#383b42',
        }}
      >
        <Text>MenuScreen</Text>
        <View></View>
      </ScrollView>
      {/* {diningHalls.map((diningHall) => {
        return <Text onClick={diningHall.id}>{diningHall.name}</Text>;
      })} */}
    </View>
  );
};

export default MenuScreen;
