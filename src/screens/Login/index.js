import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import UserService from '../../services/UserService';
import Screen from '../../components/Screen';
import routes from '../../navigation/routes';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const onLogin = async () => {
    setLoading(true);
    try {
      const response = await UserService.login({ email, password });
      dispatch(setUser(response));
    } catch (error) {
      console.log('error', error.message, error.status, error.code);
    }
    setLoading(true);
  };

  const goToSignUpScreen = () => navigation.navigate(routes.SIGN_UP);

  return (
    <Screen>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} secureTextEntry autoCapitalize="none" />
      <Button title="Login" onPress={onLogin} />
      <Button title="Sign Up" onPress={goToSignUpScreen} />
    </Screen>
  );
};

export default React.memo(Login);
