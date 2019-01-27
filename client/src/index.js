import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'redux-bundler-react';
import createStore from './app-bundles';
import App from './app-containers/App';
import * as serviceWorker from './serviceWorker';

import './css/bootstrap/css/bootstrap-pulse.min.css';
import './css/mdi/css/materialdesignicons.min.css';
import './css/index.css';

const store = createStore();

window.store = store;

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
