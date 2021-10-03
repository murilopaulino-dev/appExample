import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FilterSort from '../../components/FilterSort';
import RestaurantCard from '../../components/RestaurantCard';
import Screen from '../../components/Screen';
import { COLORS, ORDER } from '../../constants';
import routes from '../../navigation/routes';
import { setUser } from '../../redux/actions/user';
import RestaurantService from '../../services/RestaurantService';
import {
  checkIfUserIsAdmin,
  checkIfUserRoleIsOwner,
  userCanCreateRestaurants,
} from '../../utils/user';
import { getScreenHeightProportion } from '../../utils/screen';

const Home = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(ORDER.DESC);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const fetchData = useCallback(
    async sortOrder => {
      setRefreshing(true);
      try {
        const filter = [];
        if (checkIfUserRoleIsOwner(user)) filter.push(['owner', '==', user.id]);
        const response = await RestaurantService.getAllRestaurants(
          filter,
          sortOrder,
        );
        setRestaurants(response);
      } catch (error) {
        console.log('error', error);
      }
      setRefreshing(false);
    },
    [user],
  );

  const renderItem = ({ item: restaurant }) => (
    <RestaurantCard restaurant={restaurant} />
  );

  const openNewRestaurantPage = () => {
    navigation.navigate(routes.EDIT_RESTAURANT);
  };

  const onOpenPendingReplyScreen = () => {
    navigation.navigate(routes.REVIEWS_PENDING_REPLY);
  };

  const onOpenUsersListScreen = () => {
    navigation.navigate(routes.USERS_LIST);
  };

  const onLogout = () => {
    dispatch(setUser(null));
  };

  return (
    <Screen style={styles.container} scroll={false}>
      <FilterSort order={order} onChangeOrder={setOrder} />
      {userCanCreateRestaurants(user) && (
        <Button title="New Restaurant" onPress={openNewRestaurantPage} />
      )}
      <Button title="Logout" onPress={onLogout} />
      {checkIfUserRoleIsOwner(user) && (
        <Button
          title="Reviews Pending Reply"
          onPress={onOpenPendingReplyScreen}
        />
      )}
      {checkIfUserIsAdmin(user) && (
        <Button title="Manage Users" onPress={onOpenUsersListScreen} />
      )}
      <FlatList
        style={styles.flatList}
        data={restaurants}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={fetchData}
        contentContainerStyle={styles.flatListContent}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
  },
  flatList: {
    height: getScreenHeightProportion(),
  },
  flatListContent: {
    padding: 10,
  },
});

export default React.memo(Home);
