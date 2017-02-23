import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./favicon.ico'); // Tell webpack to load favicon.ico
//import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();
render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history} routes={routes} />
    </MuiThemeProvider>
  </Provider>, document.getElementById('app')
);