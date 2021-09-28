import React from 'react';
import { Button, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import routes from '../../navigation/routes';
import { setUser } from '../../redux/actions/user';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const setReducerUser = () => {
    dispatch(setUser({
      name: 'User Name',
      email: 'user_email@email.com',
    }));
  };

  const goToNextScreen = () => navigation.navigate(routes.SIGN_UP);

  return (
    <Screen>
      <Text>Login</Text>
      <Button title="Set Redux User" onPress={setReducerUser} />
      <Button title="Next Screen" onPress={goToNextScreen} />
    </Screen>
  );
};

export default React.memo(Login);
