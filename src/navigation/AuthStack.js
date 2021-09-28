import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from './routes';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.LOGIN} component={Login} options={{ headerShown: false }} />
    <Stack.Screen name={routes.SIGN_UP} component={Signup} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AuthStack;
