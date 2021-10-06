import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../constants';

const Button = ({ title, style, titleStyle, loading, disabled, ...props }) => {
  const disableComponent = loading || disabled;
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      disabled={disableComponent}
      {...props}>
      <Text
        style={[
          styles.title,
          titleStyle,
          disableComponent ? styles.disabled : null,
        ]}>
        {title}
      </Text>
      {loading && <ActivityIndicator />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.primaryColor,
    fontSize: 16,
    marginRight: 10,
  },
  disabled: {
    color: '#757575',
  },
});

export default React.memo(Button);
