import { View, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Button, Input, IndexPath } from '@ui-kitten/components';

import fetchInstance from '../../utils/fetchInstance';
import CustomCard from '../../components/CustomCard';

import LogoutButton from '../../components/auth/LogoutButton';

const MenuScreen = ({ navigation }) => {
  const [todayMenuDetail, setTodayMenuDetail] = useState({});
  const [searchSelectedIndex, setSearchSelectedIndex] = React.useState(new IndexPath(0));
  const [searchInput, setSearchInput] = useState('');

  const fetchTodayMenu = async () => {
    try {
      const res = await fetchInstance('/api/menu/scrapMenuToday', 'POST', null, {});
      const data = await res.json();

      setTodayMenuDetail(data.existingMenu);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInput = async () => {
    let todayFoodIds = [];
    const todayDiningHalls = Object.keys(todayMenuDetail);

    for (let i = 0; i < todayDiningHalls.length; i++) {
      if (
        todayDiningHalls[i] === '_id' ||
        todayDiningHalls[i] === 'date' ||
        todayDiningHalls[i] === '__v'
      ) {
        continue;
      }
      let singleDiningHall = todayDiningHalls[i];
      if (todayMenuDetail[singleDiningHall]) {
        todayFoodIds = todayFoodIds.concat(todayMenuDetail[singleDiningHall]);
      }
    }

    navigation.navigate('search', {
      searchInput,
      searchId: 0,
      isToday: true,
      todayFoodIds,
    });
  };

  const handleDiningHallCardPress = (newDiningHallId, isToday, foods) => {
    navigation.navigate('diningHall', { diningHallId: newDiningHallId, isToday, foods });
  };

  useEffect(fetchTodayMenu, []);

  return (
    <View style={tw`flex-1`}>
      <LogoutButton />
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
          isToday={true}
          foods={todayMenuDetail.HedrickStudy}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Rendezvous"
          url="https://menu.dining.ucla.edu/Content/Images/Menus/Rendezvous/rendezvous-logo.png"
          id="62010145877028b32701c9fc"
          isToday={true}
          foods={todayMenuDetail.Rendevzous}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="The Drey"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/Drey/drey-logo.png"
          id="62010159877028b32701ca02"
          isToday={true}
          foods={todayMenuDetail.Drey}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Bruin Cafe"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/BruinCafe/bruincafe-logo.png"
          id="62010161877028b32701ca05"
          isToday={true}
          foods={todayMenuDetail.BruinCafe}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Feast"
          url="http://menu.dining.ucla.edu/Content/Images/Menus/FeastSpiceKitchen/feastspicekitchen-logo.png?rev=2021-10-26b"
          id="62010152877028b32701c9ff"
          isToday={true}
          foods={todayMenuDetail.FeastAtRieber}
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
