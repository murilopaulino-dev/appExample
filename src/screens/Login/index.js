import React, { useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import routes from '../../navigation/routes';
import { setUser } from '../../redux/actions/user';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const onLogin = () => {
    
  };

  const onSingUpPress = () => navigation.navigate(routes.SIGN_UP);

  return (
    <Screen>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} secureTextEntry autoCapitalize="none" />
      <Button title="Login" onPress={onLogin} />
      <Button title="Sign Up" onPress={onSingUpPress} />
    </Screen>
  );
};

export default React.memo(Login);
