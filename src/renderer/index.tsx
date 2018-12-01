import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router as RouterConnect } from 'react-router';

import { store, history } from './store';
import Application from './page/Application';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <Provider store={store}>
        <RouterConnect history={history}>
            <Application />
        </RouterConnect>
    </Provider>,
    document.getElementById('root')
);
