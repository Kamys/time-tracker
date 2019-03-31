import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router as RouterConnect} from 'react-router';

import {store, history} from './store';
import Application from './application';

import 'semantic-ui-css/semantic.min.css';
import 'react-day-picker/lib/style.css';

ReactDOM.render(
    <Provider store={store}>
        <RouterConnect history={history}>
            <Application/>
        </RouterConnect>
    </Provider>
    ,
    document.getElementById('root')
);
