import { View, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Button, Input, IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

import fetchInstance from '../../utils/fetchInstance';
import CustomCard from '../../components/CustomCard';

const MenuScreen = ({ navigation }) => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [searchSelectedIndex, setSearchSelectedIndex] = React.useState(new IndexPath(0));
  const [searchInput, setSearchInput] = useState('');

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

  const handleSearchInput = async () => {
    navigation.navigate('search', { searchInput, searchId: 0 });
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
      showAlert(err.message);
    }
  }, []);

  return (
    <View style={tw`flex-1`}>
      <Input
        placeholder="Search For Food"
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
        <CustomCard
          text="The Study At Hedrick"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/HedrickStudy/hedrickstudy-logo.png"
          id="6201065115fcccb7b530545b"
          isToday={false}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Rendezvous"
          url="https://menu.dining.ucla.edu/Content/Images/Menus/Rendezvous/rendezvous-logo.png"
          id="62010145877028b32701c9fc"
          isToday={false}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="The Drey"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/Drey/drey-logo.png"
          id="62010159877028b32701ca02"
          isToday={false}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Bruin Cafe"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/BruinCafe/bruincafe-logo.png"
          id="62010161877028b32701ca05"
          isToday={false}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Feast"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/FeastSpiceKitchen/feastspicekitchen-logo.png?rev=2021-10-26b"
          id="62010152877028b32701c9ff"
          isToday={false}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="De Neve"
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSstV6zo2wn0mfdKuXFbOIv9Eg6dTEYqOjgifHY78OFs9F5tfyg5zjMbOq1psG7v5223dk&usqp=CAU"
          id="<CustomCard
          "
          isToday={false}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Epicuria"
          url="https://asucla.ucla.edu/v2/wp-content/uploads/2021/10/epicuria-300x153.jpg"
          id="62010530c23b80b6ae530ddd"
          isToday={false}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Bruin Plate"
          url="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20143/534d978abd26f552ab000554_BruinPlate_Logo_FullColor/BruinPlate_Logo_FullColor_41db8eb4-2f25-41fa-9d71-ff19f2170580-prv.jpg"
          id="6201052ac23b80b6ae530dda"
          isToday={false}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>
      </ScrollView>
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
