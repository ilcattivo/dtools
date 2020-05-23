import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import routeReducer from './reducers';
import PageHeader from './components/page-header';
import Routes from './routes';
import './index.sass';

const composeStoreWithMiddleware = applyMiddleware(
  promise,
  ReduxThunk
)(createStore);

const store = composeStoreWithMiddleware(
  routeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PageHeader />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
