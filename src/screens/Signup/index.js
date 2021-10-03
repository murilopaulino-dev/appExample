import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, Button } from 'react-native';
import Screen from '../../components/Screen';
import AuthUserService from '../../services/AuthUserService';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();

  const onSingUp = async () => {
    setLoading(true);
    try {
      await AuthUserService.signUp({ email, password });
      navigation.goBack();
    } catch (error) {
      console.log('error', error.message, error.status, error.code);
    }
    setLoading(true);
  };
  return (
    <Screen>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} style={{ borderBottomWidth: 1, flex: 1, marginHorizontal: 10 }} secureTextEntry autoCapitalize="none" />
      <Button title="Sign Up" onPress={onSingUp} />
    </Screen>
  );
};

export default React.memo(Signup);
