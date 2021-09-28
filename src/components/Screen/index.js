import React from 'react';
import { SafeAreaView } from 'react-native';

const Screen = ({ children }) => {
  return (
    <SafeAreaView>
      {children}
    </SafeAreaView>
  );
};

export default React.memo(Screen);
