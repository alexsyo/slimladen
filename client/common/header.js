import React from 'react';
import { View, Image } from 'react-native';
import logo from '../assets/vandebron.png';

export default ({ style }) => (
  <View style={{ backgroundColor: 'red' }}>
    <Image source={logo} style={style} />
  </View>
);
