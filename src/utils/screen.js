import { Dimensions } from 'react-native';

export const getScreenWidthProportion = (proportion = 1) => Dimensions.get('window').width * proportion;

export const getScreenHeightProportion = (proportion = 1) => Dimensions.get('window').width * proportion;
