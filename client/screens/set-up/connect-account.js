import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import google from '../../assets/google.jpg';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  button: {},

  image: {
    width: 200,
    height: 200
  }
});

export default class ConnectAccount extends React.Component {
  static navigationOptions = {
    title: 'Connect google account',
  };

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <View style={styles.main}>
        <Image source={google} style={styles.image} />
        <Button
          onPress={() => navigate('allowHistoryAccess')}
          title="Proceed"
        />
      </View>
    );
  }
}
