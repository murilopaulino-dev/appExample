import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from './routes';
import Home from '../screens/Home';
import RestaurantDetails from '../screens/RestaurantDetails';
import UserSelector from '../screens/UserSelector';
import EditRestaurant from '../screens/EditRestaurant';
import NewReview from '../screens/NewReview';
import ReviewsPendingReply from '../screens/ReviewsPendingReply';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.USER_SELECTOR} component={UserSelector} options={{ title: 'User Selector' }} />
    <Stack.Screen name={routes.HOME} component={Home} options={{ title: 'Welcome' }} />
    <Stack.Screen name={routes.RESTAURANT_DETAILS} component={RestaurantDetails} options={{ title: 'Rest' }} />
    <Stack.Screen name={routes.EDIT_RESTAURANT} component={EditRestaurant} options={{ title: 'Rest' }} />
    <Stack.Screen name={routes.NEW_REVIEW} component={NewReview} options={{ title: 'Review' }} />
    <Stack.Screen name={routes.REVIEWS_PENDING_REPLY} component={ReviewsPendingReply} options={{ title: 'Reviews' }} />
  </Stack.Navigator>
);

export default AppStack;
