import 'idempotent-babel-polyfill';
import '@stripe/stripe-js'; // PCI compliance and extra security https://github.com/stripe/stripe-js#ensuring-stripejs-is-available-everywhere

// import { useEmulator } from './app/services/firebase';

/*
    App Bootstrap

    1) Configure Client
    2) Initialize App

*/
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from 'components/App';

// configure app from /config service
const configure_client = async env => {

  // hot reload
  module.hot && module.hot.accept();

  // connect to local firestore db resource
  // env.shouldEmulate && useEmulator();

  // configure and expose material ui styles from styles config json
  return [ env, createMuiTheme(env.styles) ];
};

// bootstrap app
const bootstrap_app = ([ env_config, theme ]) => ReactDOM.render(

  <MuiThemeProvider theme={ theme }>
    <App env={ env_config } compiler="TypeScript" framework="React" />
  </MuiThemeProvider>,

  document.getElementById('app')
);

// configure then bootstrap app
const init_app = () => configure_client(process.env.app).then(bootstrap_app);

// initialize SW - prep for offline activity (cache app shell static assets + data)
init_app();
