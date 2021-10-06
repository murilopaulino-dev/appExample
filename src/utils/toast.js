import Toast from 'react-native-root-toast';

const TOP_POSITION = Toast.positions.TOP + 35;

export const successToast = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: TOP_POSITION,
    animation: true,
    hideOnPress: true,
    opacity: 1,
    backgroundColor: '#04e995',
    textColor: '#FFF',
    textStyle: { fontWeight: 'bold' },
  });
};

export const showToast = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: TOP_POSITION,
    animation: true,
    hideOnPress: true,
    opacity: 1,
    backgroundColor: '#555',
    textColor: '#FFF',
    textStyle: { fontWeight: 'bold' },
  });
};

export const errorToast = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: TOP_POSITION,
    animation: true,
    hideOnPress: true,
    opacity: 1,
    backgroundColor: '#BB0000',
    textColor: '#FFF',
    textStyle: { fontWeight: 'bold' },
  });
};
