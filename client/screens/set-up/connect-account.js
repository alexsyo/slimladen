import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center'
  },

  button: {}
});

export default class ConnectAccount extends React.Component {
  static navigationOptions = {
    title: 'Connect google account'
  };

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <View style={styles.main}>
        <Button
          onPress={() => navigate('allowHistoryAccess')}
          title="Proceed"
        />
      </View>
    );
  }
}
