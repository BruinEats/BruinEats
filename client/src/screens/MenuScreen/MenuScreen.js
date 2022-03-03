import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Button, Input, IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

import fetchInstance from '../../utils/fetchInstance';
import CustomCard from '../../components/CustomCard';
import rootUrl from '../../utils/rootUrl';

const MenuScreen = ({ navigation }) => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [searchSelectedIndex, setSearchSelectedIndex] = React.useState(new IndexPath(0));
  const [searchInput, setSearchInput] = useState('');
  const searchRef = useRef(null);

  const handleSearchInput = async () => {
    navigation.navigate('search', { searchInput, searchId: searchSelectedIndex });
  };

  const handleDiningHallCardPress = (newDiningHallId) => {
    navigation.navigate('diningHall', { diningHallId: newDiningHallId });
  };

  useEffect(async () => {
    try {
      const res = await fetchInstance(`/api/diningHall/all`, 'GET');
      const data = await res.json();
      setDiningHalls(data.allDiningHalls);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <View style={tw`flex-1`}>
      {/* <AutocompleteDropdown
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
      ></AutocompleteDropdown> */}

      <Layout level="1">
        <Select
          selectedIndex={searchSelectedIndex}
          onSelect={(index) => setSearchSelectedIndex(index)}
          value={searchSelectedIndex.row === 0 ? 'Search For Food' : 'Search For Dining Hall'}
          style={styles.searchHeader}
        >
          <SelectItem title="Search For Food" />
          <SelectItem title="Search For Dining Hall" />
        </Select>
      </Layout>
      <Input
        placeholder="Search Input"
        value={searchInput}
        onChangeText={(nextValue) => setSearchInput(nextValue)}
      />
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
  searchHeader: {
    fontWeight: 'bold',
  },
});

export default MenuScreen;
