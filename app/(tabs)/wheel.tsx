import React from 'react';
import { StyleSheet } from 'react-native';
import Wheel from '../../components/Wheel';
import { ThemedView } from '../../components/ThemedView';

export default function WheelScreen() {
  return (
    <ThemedView style={styles.container}>
      <Wheel />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
