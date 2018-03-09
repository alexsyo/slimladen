import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center'
  },

  button: {}
});

export default class AllowHistoryAccess extends React.Component {
  static navigationOptions = {
    title: 'Allow Slim Laden to access your history'
  };

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <View style={styles.main}>
        <Button
          onPress={() => navigate('connectCar')}
          title="Proceed"
        />
      </View>
    );
  }
}

