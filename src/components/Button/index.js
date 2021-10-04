import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

const Button = ({ title, style, titleStyle, disabled, ...props }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Text
        style={[styles.title, titleStyle, disabled ? styles.disabled : null]}>
        {title}
      </Text>
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
  disabled: {
    color: '#757575',
  },
});

export default React.memo(Button);
