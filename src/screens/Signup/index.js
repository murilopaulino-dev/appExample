import React, { useState } from 'react';
import AuthUserService from '../../services/AuthUserService';
import AuthContent from '../AuthContent';

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
    <AuthContent
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={onSingUp}
      submitText="Sign Up"
      loading={loading}
    />
  );
};

export default React.memo(Signup);
