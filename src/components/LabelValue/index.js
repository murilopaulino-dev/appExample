import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LabelValue = ({ label, value, ...valueProps }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}: </Text>
    <Text {...valueProps}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 3 },
  label: { fontWeight: 'bold' },
});

export default React.memo(LabelValue);
