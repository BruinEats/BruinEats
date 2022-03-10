import { View, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Button, Input, IndexPath } from '@ui-kitten/components';

import fetchInstance from '../../utils/fetchInstance';
import CustomCard from '../../components/CustomCard';

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

        <CustomCard
          text="De Neve"
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSstV6zo2wn0mfdKuXFbOIv9Eg6dTEYqOjgifHY78OFs9F5tfyg5zjMbOq1psG7v5223dk&usqp=CAU"
          id="<CustomCard
          "
          isToday={true}
          foods={todayMenuDetail.DeNeve}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Epicuria"
          url="https://asucla.ucla.edu/v2/wp-content/uploads/2021/10/epicuria-300x153.jpg"
          id="62010530c23b80b6ae530ddd"
          isToday={true}
          foods={todayMenuDetail.Epicuria}
          handleOnPress={handleDiningHallCardPress}
        ></CustomCard>

        <CustomCard
          text="Bruin Plate"
          url="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20143/534d978abd26f552ab000554_BruinPlate_Logo_FullColor/BruinPlate_Logo_FullColor_41db8eb4-2f25-41fa-9d71-ff19f2170580-prv.jpg"
          id="6201052ac23b80b6ae530dda"
          isToday={true}
          foods={todayMenuDetail.BruinPlate}
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
