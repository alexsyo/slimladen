import React from 'react';
import { View, Image } from 'react-native';
import logo from '../assets/vandebron.png';

const style = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
};

export default class Header extends React.Component {
  render() {
    return (
      <View style={style}>
        <Image source={logo} onPress={() => Alert.alert('anbc')} />
      </View>
    );
  }
}
