import { Pressable, View, Text, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

const CustomButton = ({ onPress, text, type, bgColor, text_type }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[tw`bg-${bgColor}`, styles.container, styles[`container_${type}`]]}
    >
      <Text
        style={[
          styles.text,
          tw.style('text-slate-600'),
          // text_type == 'Tertiary' ? 'text-slate-600' : ''),
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

//TODO: CHANGE ALL STYLES TO TAILWINDCSS STYLE style={tw.style(type == 'login' ? 'bg-grey-100' : 'bg-blue-100')}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 14,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },
  container_Primary: {
    backgroundColor: '#3B71F3',
  },
  container_Tertiary: {
    padding: 5,
  },
  text: {
    fontWeight: 'bold',
  },
  text_Primary: {},
  text_Tertiary: {},
});

export default CustomButton;
