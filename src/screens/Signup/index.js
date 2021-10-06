import React, { useState } from 'react';
import { ERROR_CODES } from '../../constants';
import AuthUserService from '../../services/AuthUserService';
import errorHandler from '../../utils/errorHandler';
import { successToast } from '../../utils/toast';
import AuthContent from '../AuthContent';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [loading, setLoading] = useState();

  const onSingUp = async () => {
    setLoading(true);
    try {
      if (!email) throw new Error(ERROR_CODES.EMPTY_EMAIL);
      if (!password) throw new Error(ERROR_CODES.EMPTY_PASSWORD);
      await AuthUserService.signUp({ email, password, name });
      successToast('User created. Login to access the app.');
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
      name={name}
      setName={setName}
      onSubmit={onSingUp}
      submitText="Sign Up"
      loading={loading}
    />
  );
};

export default React.memo(Signup);
