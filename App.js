import React from 'react';
import Auth from "./src/components/Auth";
import BottomTabNavigator from './src/navigation/TabNavigator';
import createStore, { StoreContext } from './src/utils/Context';

function App() {
  const store = createStore();

  return (
    <StoreContext.Provider value={store}>
      {
        store.isAuthenticated ? <BottomTabNavigator/> : <Auth/>
      }
    </StoreContext.Provider>
  );
}

export default App;