import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../navigation/routes';
import { setUser } from '../../redux/actions/user';

const Login = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  console.log('user', user);
  console.log('navigation', navigation);

  const setReducerUser = () => {
    dispatch(setUser({
      name: 'User Name',
      email: 'user_email@email.com',
    }));
  };

  const goToNextScreen = () => navigation.navigate(routes.SIGN_UP);

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <Button title="Set Redux User" onPress={setReducerUser} />
      <Button title="Next Screen" onPress={goToNextScreen} />
    </SafeAreaView>
  );
};

export default React.memo(Login);
