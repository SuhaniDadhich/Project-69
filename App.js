import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScanScreen from './screens/ScanScreen';

export default function App() {
  return (
    <View>
      <ScanScreen/>
    </View>
  );
}

