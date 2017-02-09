import React from 'react';
import 'babel-polyfill';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory} from 'react-router';
import { render } from 'react-dom';
import App from './containers/App';
import Minions from './containers/Minions';
import './styles/app.scss'
import configureStore from './store/configureStore'

export const store = configureStore();

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App}/>
            <Route path='/minions' component={Minions}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);