import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
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
import errorHandler from '../../utils/errorHandler';

const Home = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState(ORDER.DESC);
  const [higherRatingFilter, setHigherRatingFilter] = useState();
  const [lowerRatingFilter, setLowerRatingFilter] = useState();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      fetchData(order, higherRatingFilter, lowerRatingFilter);
    }, [fetchData, order, higherRatingFilter, lowerRatingFilter]),
  );

  const fetchData = useCallback(
    async (sortOrder, higherRating, lowerRating) => {
      setRefreshing(true);
      try {
        const filter = [];
        if (higherRating) filter.push(['averageRating', '<=', higherRating]);
        if (lowerRating) filter.push(['averageRating', '>=', lowerRating]);
        if (checkIfUserRoleIsOwner(user)) filter.push(['owner', '==', user.id]);
        const response = await RestaurantService.getAllRestaurants(
          filter,
          sortOrder,
        );
        setRestaurants(response);
      } catch (error) {
        errorHandler(error?.response?.data?.error);
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
      <FilterSort
        order={order}
        onChangeOrder={setOrder}
        higherRatingFilter={higherRatingFilter}
        setHigherRatingFilter={setHigherRatingFilter}
        lowerRatingFilter={lowerRatingFilter}
        setLowerRatingFilter={setLowerRatingFilter}
        loading={refreshing}
      />
      {userCanCreateRestaurants(user) && (
        <Button
          title="New Restaurant"
          onPress={openNewRestaurantPage}
          titleStyle={styles.button}
        />
      )}
      <Button title="Logout" onPress={onLogout} titleStyle={styles.button} />
      {checkIfUserRoleIsOwner(user) && (
        <Button
          title="Reviews Pending Reply"
          onPress={onOpenPendingReplyScreen}
          titleStyle={styles.button}
        />
      )}
      {checkIfUserIsAdmin(user) && (
        <Button
          title="Manage Users"
          onPress={onOpenUsersListScreen}
          titleStyle={styles.button}
        />
      )}
      <FlatList
        style={styles.flatList}
        data={restaurants}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={fetchData}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={item => item.id}
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
  button: {
    color: '#DDD',
    fontWeight: 'bold',
  },
});

export default React.memo(Home);
