import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'styles/style.scss';
import store from './store';
import LoginPage from './LoginPage';
import App from './App';

const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root,
);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        ReactDOM.render(
            <Provider store={store}>
                <NextApp />
            </Provider>,
            root,
        );
    });
}