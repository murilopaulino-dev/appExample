import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from './routes';
import Home from '../screens/Home';
import RestaurantDetails from '../screens/RestaurantDetails';
import UserSelector from '../screens/UserSelector';
import EditRestaurant from '../screens/EditRestaurant';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.USER_SELECTOR} component={UserSelector} options={{ title: 'User Selector' }} />
    <Stack.Screen name={routes.HOME} component={Home} options={{ title: 'Welcome' }} />
    <Stack.Screen name={routes.RESTAURANT_DETAILS} component={RestaurantDetails} options={{ title: 'Rest' }} />
    <Stack.Screen name={routes.NEW_EDIT_RESTAURANT} component={EditRestaurant} options={{ title: 'Rest' }} />
  </Stack.Navigator>
);

export default AppStack;
