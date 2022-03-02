import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Button, Input } from '@ui-kitten/components';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';
import axios from 'axios';
import CustomCard from '../../components/CustomCard';
import rootUrl from '../../utils/rootUrl';

const MenuScreen = ({ navigation }) => {
  const [diningHalls, setDiningHalls] = useState([]);
  const searchRef = useRef(null);

  const handleSearchInput = async () => {
    console.warn(searchRef.current);
  };

  const handleDiningHallCardPress = (newDiningHallId) => {
    navigation.navigate('diningHall', { diningHallId: newDiningHallId });
  };

  useEffect(async () => {
    try {
      const res = await axios.get(`${rootUrl}/api/diningHall/all`);
      setDiningHalls(res.data.allDiningHalls);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <View style={tw`flex-1`}>
      <AutocompleteDropdown
        dataSet={diningHalls.map((diningHall) => {
          return {
            id: diningHall._id,
            title: diningHall.name,
          };
        })}
        ref={searchRef}
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
      <Button style={styles.menuSearchBar} onPress={handleSearchInput}>
        Search
      </Button>
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
          id="6201065115fcccb7b530545b"
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Rendezvous"
          url="https://menu.dining.ucla.edu/Content/Images/Menus/Rendezvous/rendezvous-logo.png"
          id="62010145877028b32701c9fc"
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="The Drey"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/Drey/drey-logo.png"
          id="62010159877028b32701ca02"
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Bruin Cafe"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/BruinCafe/bruincafe-logo.png"
          id="62010161877028b32701ca05"
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Feast"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/FeastSpiceKitchen/feastspicekitchen-logo.png?rev=2021-10-26b"
          id="62010152877028b32701c9ff"
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>
      </ScrollView>
      {/* {diningHalls.map((diningHall) => {
        return <Text onClick={diningHall.id}>{diningHall.name}</Text>;
      })} */}
    </View>
  );
};

const styles = StyleSheet.create({
  menuSearchBar: {
    marginTop: 5,
  },
  diningHallCard: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default MenuScreen;
