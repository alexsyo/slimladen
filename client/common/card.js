import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333D47',
    borderBottomWidth: 3,
    borderStyle: 'solid',
    borderBottomColor: '#43B02A',
    margin: 15,
    padding: 25,
    marginBottom: 10,
  },

  title: {
    fontSize: 25,
    color: 'white',
    marginBottom: 15
  }
});

const Title = ({ text }) => <Text style={styles.title}>{text}</Text>;

export default ({ title, children }) => (
  <View style={styles.container}>
    {title && (<Title text={title} />)}
    {children}
  </View>
);
