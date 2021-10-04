import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Field = ({ style, inputStyle, label, ...props }) => {
  return (
    <View style={style}>
      <Text>{label}</Text>
      <TextInput style={[styles.input, inputStyle]} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
  },
});

export default React.memo(Field);
