import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from './routes';
import Home from '../screens/Home';
import RestaurantDetails from '../screens/RestaurantDetails';
// import UserSelector from '../screens/UserSelector';
import EditRestaurant from '../screens/EditRestaurant';
import EditReview from '../screens/EditReview';
import ReviewsPendingReply from '../screens/ReviewsPendingReply';
import UsersList from '../screens/UsersList';
import UserDetails from '../screens/UserDetails';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    {/* <Stack.Screen name={routes.USER_SELECTOR} component={UserSelector} options={{ title: 'User Selector' }} /> */}
    <Stack.Screen
      name={routes.HOME}
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.RESTAURANT_DETAILS}
      component={RestaurantDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.EDIT_RESTAURANT}
      component={EditRestaurant}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.EDIT_REVIEW}
      component={EditReview}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.REVIEWS_PENDING_REPLY}
      component={ReviewsPendingReply}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.USERS_LIST}
      component={UsersList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.USER_DETAILS}
      component={UserDetails}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppStack;
