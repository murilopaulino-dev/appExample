import React from 'react';
import { SafeAreaView } from 'react-native';

const Screen = ({ children, ...props }) => {
  return (
    <SafeAreaView {...props}>
      {children}
    </SafeAreaView>
  );
};

export default React.memo(Screen);
