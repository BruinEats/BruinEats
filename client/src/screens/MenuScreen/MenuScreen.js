import { View, Image, ScrollView } from 'react-native';
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
import CustomCard from '../../components/CustomCard';

const MenuScreen = ({ navigation }) => {
  const [diningHalls, setDiningHalls] = useState([]);
  // useEffect(async () => {
  //   const res = await axios.get('/api/diningHall/all');
  //   console.log(res.data);
  //   setDiningHalls(res.data);
  // }, []);

  useEffect(async () => {
    const res = await axios.get('/api/dininghall/all');
    setDiningHalls(res.data);
    console.log(res.data);
  }, []);

  return (
    <View style={tw`flex-1`}>
      <AutocompleteDropdown
        dataSet={[
          { id: '1', title: 'Epicuria' },
          { id: '2', title: 'B Cafe' },
          { id: '3', title: 'De Neve' },
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
      <ScrollView
        style={tw`mx-0.5`}
        suggestionsListContainerStyle={{
          backgroundColor: '#383b42',
        }}
      >
        {/* {diningHalls.map((diningHall) => {
          return (
            <CustomCard
              text={diningHall.name}
              url="http://menu.dining.ucla.edu/Content/Images/Menus/HedrickStudy/hedrickstudy-logo.png"
            ></CustomCard>
          );
        })} */}
        <CustomCard
          text="The Study At Hedrick"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/HedrickStudy/hedrickstudy-logo.png"
        ></CustomCard>
        <CustomCard
          text="Rendezvous"
          url="https://menu.dining.ucla.edu/Content/Images/Menus/Rendezvous/rendezvous-logo.png"
        ></CustomCard>
        <CustomCard
          text="The Drey"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/Drey/drey-logo.png"
        ></CustomCard>
        <CustomCard
          text="Bruin Cafe"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/BruinCafe/bruincafe-logo.png"
        ></CustomCard>
        <CustomCard
          text="Feast"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/FeastSpiceKitchen/feastspicekitchen-logo.png?rev=2021-10-26b"
        ></CustomCard>
      </ScrollView>
      {/* {diningHalls.map((diningHall) => {
        return <Text onClick={diningHall.id}>{diningHall.name}</Text>;
      })} */}
    </View>
  );
};

export default MenuScreen;
