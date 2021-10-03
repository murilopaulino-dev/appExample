import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import routes from '../../navigation/routes';

const UserCard = ({ user }) => {
  const navigation = useNavigation();
  const onOpenUser = () => {
    navigation.navigate(routes.USER_DETAILS, user.id);
  };

  return (
    <TouchableOpacity style={{ marginTop: 10 }} onPress={onOpenUser}>
      <Text>{user.email} - {user.role}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(UserCard);
