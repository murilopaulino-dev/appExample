import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

const Screen = ({ children, style, innerStyle, scroll = true, ...props }) => {
  const ViewComponent = scroll ? ScrollView : View;
  return (
    <View style={[{ flex: 1 }, style]}>
      <SafeAreaView style={[{ flex: 1 }, innerStyle]}>
        <ViewComponent {...props}>{children}</ViewComponent>
      </SafeAreaView>
    </View>
  );
};

export default React.memo(Screen);
