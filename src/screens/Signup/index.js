import React, { useState } from 'react';
import AuthUserService from '../../services/AuthUserService';
import errorHandler from '../../utils/errorHandler';
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
      errorHandler(error?.response?.data?.error);
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
