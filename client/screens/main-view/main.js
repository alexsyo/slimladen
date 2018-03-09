import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import Card from '../../common/card';
import battery from '../../assets/battery.png';

export default class MainScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <Card title="Battery level">
          <Text style={{ color: '#43B02A', fontSize: 42 }}>42%</Text>
        </Card>

        <Card title="Charge status">
          <View style={{ alignItems: 'center' }}>
            <Image source={battery} />
          </View>
        </Card>

        <Card title="Location">
          <Text style={{ color: 'white' }}>content</Text>
          <Text style={{ color: 'white' }}>content</Text>
          <Text style={{ color: 'white' }}>content</Text>
          <Text style={{ color: 'white' }}>content</Text>
          <Text style={{ color: 'white' }}>content</Text>
          <Text style={{ color: 'white' }}>content</Text>
          <Text style={{ color: 'white' }}>content</Text>
          <Text style={{ color: 'white' }}>content</Text>
        </Card>
      </ScrollView>
    );
  }
}
