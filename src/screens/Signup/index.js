import React, { useState } from 'react';
import { ERROR_CODES } from '../../constants';
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
      if (!email) throw new Error(ERROR_CODES.EMPTY_EMAIL);
      if (!password) throw new Error(ERROR_CODES.EMPTY_PASSWORD);
      await AuthUserService.signUp({ email, password });
      navigation.goBack();
    } catch (error) {
      errorHandler(error);
    }
    setLoading(false);
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
