import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import GameContainer from './components/GameContainer';

export default class App extends Component {
  render() {
    return (
      <View>
        <GameContainer />
      </View>
    );
  }
}
