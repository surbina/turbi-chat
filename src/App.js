import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store';

function App() {
  return (
    <Provider store={createStore()}>
      <div>
        This will be the app
      </div>
    </Provider>
  );
}

export default App;
