import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ORDER } from '../../constants';

const FilterSort = ({ order, onChangeOrder }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onChangeOrder(order === ORDER.ASC ? ORDER.DESC : ORDER.ASC)}>
        <Text>
          {order === ORDER.ASC ? 'Asc' : 'Desc'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(FilterSort);
