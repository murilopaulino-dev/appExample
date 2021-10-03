import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Field = ({ style, inputStyle, label, ...props }) => {
  return (
    <View style={style}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {

  },
  input: {
    borderBottomWidth: 1,
  },
});

export default React.memo(Field);
