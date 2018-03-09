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
import Splash from './common/splash';
import ConnectAccount from './screens/set-up/connect-account';
import AllowHistoryAccess from './screens/set-up/allow-history-access';
import ConnectCar from './screens/set-up/connect-car';
import MainScreen from './screens/main-view/main';

const Screens = StackNavigator({
  connectAccount: { screen: ConnectAccount },
  allowHistoryAccess: { screen: AllowHistoryAccess },
  connectCar: { screen: ConnectCar },
  splash: { screen: Splash },
  main: { screen: MainScreen }
});


export default class App extends React.Component {
  state = {
    visibleComponent: Splash
  };

  componentDidMount() {
    setTimeout(() =>
      this.setState({ visibleComponent: Screens }),
      1500
    );
  }

  render() {
    const VisibleComponent = this.state.visibleComponent;

    return (
      <View style={styles.container}>
        <VisibleComponent />
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
