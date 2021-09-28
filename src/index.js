import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

import NavigationEntry from './navigation';

const App = ({}) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationEntry />
      </PersistGate>
    </Provider>
  );
};

export default React.memo(App);
