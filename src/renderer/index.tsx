import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router as RouterConnect } from 'react-router';

import { store, history } from './store';

ReactDOM.render(
    <Provider store={store}>
        <RouterConnect history={history}>
            <div>Hello world!</div>
        </RouterConnect>
    </Provider>,
    document.getElementById('root')
);
