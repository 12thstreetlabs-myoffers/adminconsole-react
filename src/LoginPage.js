import React, { Fragment } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from 'components/Login/Login';
import AdminConsole from 'components/AdminConsole'

export default function LoginPage() {
    return (
        <HashRouter>
            <Fragment>
            <Route path='/login' component={Login} />
            <Route path='/adminConsole' component={AdminConsole} />
            </Fragment>
        </HashRouter>
    );
}
