import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import AuthUserService from '../../services/AuthUserService';
import routes from '../../navigation/routes';
import AuthContent from '../AuthContent';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const onLogin = async () => {
    setLoading(true);
    try {
      const response = await AuthUserService.login({ email, password });
      dispatch(setUser(response));
    } catch (error) {
      console.log('error', error.message, error.status, error.code);
    }
    setLoading(false);
  };

  const goToSignUpScreen = () => navigation.navigate(routes.SIGN_UP);

  return (
    <AuthContent
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={onLogin}
      submitText="Login"
      isLogin={true}
      loading={loading}
      goToSignUpScreen={goToSignUpScreen}
    />
  );
};

export default React.memo(Login);
