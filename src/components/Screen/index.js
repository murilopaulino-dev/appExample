import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

const Screen = ({ children, scroll = true, ...props }) => {
  const ViewComponent = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViewComponent {...props}>{children}</ViewComponent>
    </SafeAreaView>
  );
};

export default React.memo(Screen);
