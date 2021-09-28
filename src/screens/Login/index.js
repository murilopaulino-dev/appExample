import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions/user';

const Login = ({}) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  console.log('user', user);

  const setReducerUser = () => {
    dispatch(setUser({
      name: 'User Name',
      email: 'user_email@email.com',
    }));
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <Button title="Set Redux User" onPress={setReducerUser} />
    </SafeAreaView>
  );
};

export default React.memo(Login);
