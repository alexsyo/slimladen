import React from 'react';
import {
  StyleSheet,
  Button,
  Image,
  Alert,
  Text,
  View
} from 'react-native';
import { StackNavigator, } from 'react-navigation';
import ConnectAccount from './screens/set-up/connect-account';
import AllowHistoryAccess from './screens/set-up/allow-history-access';
import ConnectCar from './screens/set-up/connect-car';

const Screens = StackNavigator({
  connectAccount: { screen: ConnectAccount },
  allowHistoryAccess: { screen: AllowHistoryAccess },
  connectCar: { screen: ConnectCar }
});


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Screens />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },

  header: {
  }
});
