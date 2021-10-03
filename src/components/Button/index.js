import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

const Button = ({ title, style, titleStyle, ...props }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
  },
  title: {
    color: COLORS.primaryColor,
    fontSize: 16,
  },
});

export default React.memo(Button);
