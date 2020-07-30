import React, { Fragment } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import OrdersList from 'components/Orders/OrdersList';
import OrderDetail from 'components/Orders/OrderDetail';
import Laundries from 'components/Laundries/LaundriesList';
import LaundriesDetail from 'components/Laundries/LaundriesDetail';
import CustomersList from 'components/Customers/CustomersList';
import CustomerDetail from 'components/Customers/CustomerDetail';
import Reviews from 'components/Reviews/Reviews';
import Dashboard from 'components/Dashboard';
import Navigation from 'components/Navigation';
import CategoriesList from 'components/Categories/CategoriesList';
import CategoryDetail from 'components/Categories/CategoryDetail';
import ItemsList from 'components/Items/ItemsList';
import ItemsDetail from 'components/Items/ItemsDetail';
import GoCreditList from 'components/GoCredit/GoCreditList';
import GoCreditDetail from 'components/GoCredit/GoCreditDetail';
import LaundryReport from 'components/Reports/LaundryReport';
import Login from 'components/Login/Login';
import UserReport from './components/Reports/UserReport';
import NotificationsList from './components/Notifications/NotificationsList';
import OrderReassignList from './components/OrderReassign/OrdersList';
import OrderReassignDetail from './components/OrderReassign/OrderDetail';
import AreasList from './components/Areas/AreasList';
import AreasDetail from './components/Areas/AreasDetail';
import CatAreasList from './components/CatAreas/CatAreasList';
import CatAreasDetail from './components/CatAreas/CatAreasDetail';
export default function App() {
    return (
        <HashRouter>
            <Fragment>
                <Navigation />
                <main role='main' className='col-md-9 ml-sm-auto col-lg-10 pl-0 pr-0'>
                    <div className='container-fluid p-0 m-0 h-100'>
                        <Switch>
                             <Route
                                exact
                                path='/'
                                render={() => <Redirect to='/login/' component={Login} />}
                            />>
                            <Route path='/login/' component={Login} />
                            <Route path='/categories/edit/:id/' component={CategoryDetail} />
                            <Route path='/orders/edit/:id/' component={OrderDetail} />
                            <Route path='/laundries/edit/:id/' component={LaundriesDetail} />
                            <Route path='/customers/edit/:id/' component={CustomerDetail} />
                            <Route path='/customers/add/' component={CustomerDetail} />
                            <Route path='/laundries/add/' component={LaundriesDetail} />
                            <Route path='/categories/add/' component={CategoryDetail} />
                            <Route path='/dashboard/' component={Dashboard} />
                            <Route path='/laundries/' component={Laundries} />
                            <Route path='/customers/' component={CustomersList} />
                            <Route path='/reviews/' component={Reviews} />
                            <Route path='/categories/' component={CategoriesList} />
                            <Route path='/orders/:filter?/' component={OrdersList} />
                            <Route path='/items/edit/:id/' component={ItemsDetail} />
                            <Route path='/items/add/' component={ItemsDetail} />
                            <Route path='/items/' component={ItemsList} />
                             <Route path='/goCredit/edit/:id/' component={GoCreditDetail} />
                            <Route path='/goCredit/add/' component={GoCreditDetail} />
                            <Route path='/goCredit/' component={GoCreditList} />
                            <Route path='/catAreas/edit/:id/' component={CatAreasDetail} />
                            <Route path='/catAreas/add/' component={CatAreasDetail} />
                            <Route path='/catAreas/' component={CatAreasList} />
                            <Route path='/areas/edit/:id/' component={AreasDetail} />
                            <Route path='/areas/add/' component={AreasDetail} />
                            <Route path='/areas/' component={AreasList} />
                            <Route path='/laundryReport/' component={LaundryReport} />
                            <Route path='/userReport/' component={UserReport} />
                            <Route path='/notifications/' component={NotificationsList} />
                            <Route path='/orderReassign/edit/:id/' component={OrderReassignDetail} />
                            <Route path='/orderReassign/' component={OrderReassignList} />
                        </Switch>
                    </div>
                </main>
            </Fragment>
        </HashRouter>
    );
}
