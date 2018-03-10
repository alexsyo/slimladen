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

import axios from 'axios';

const Screens = StackNavigator({
  // connectAccount: { screen: ConnectAccount },
  // allowHistoryAccess: { screen: AllowHistoryAccess },
  // connectCar: { screen: ConnectCar },
  main: { screen: MainScreen },
  splash: { screen: Splash },
});


export default class App extends React.Component {
  state = {
    splash: true,
    locations: []
  };

  componentDidMount = async () => {
    setTimeout(async () => {
      this.setState({ splash: false });
      await this.startSession();
      this.poll();
    }, 1500);
  }

  startSession = async () => {
    return axios.post('https://vandebron2.localtunnel.me', {
      "event_type": "session_started",
      "evse_id": "NL-EVN-E32486-13208",
      "connector_no": "2"
    })
  }

  poll = async () => {
    setInterval(() => {
    return axios.get('https://vandebron2.localtunnel.me/sessionStatus')
      .then(res => {
        this.setState({ locations: this.state.locations.concat(res.data) })
      })
    }, 5000)
  }

  render() {
    // const VisibleComponent = this.state.visibleComponent;

    const Component = this.state.splash 
          ? <Splash />
          : <Screens screenProps={this.state.locations} />

    return (
      <View style={styles.container}>
        {Component}
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
