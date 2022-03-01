import { Text, useTheme, Card } from '@ui-kitten/components';
import { View, Image, ScrollView } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

const CustomCard = ({ text, url, id, handleOnPress }) => {
  // const theme = useTheme();

  return (
    <Card
      style={[
        tw`flex flex-col content-center w-full p-0`,
        // { backgroundColor: theme['color-primary-default']},
      ]}
      onPress={() => handleOnPress(id)}
    >
      <Image
        style={tw`w-full h-40`}
        source={{
          uri: url,
        }}
      ></Image>
      <Text
        style={tw`m-auto pt-2 text-2xl font-semibold`}
        // category="h4" status="control"
      >
        {text}
      </Text>
    </Card>
  );
};

export default CustomCard;
