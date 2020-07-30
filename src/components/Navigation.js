import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from 'components/svg/Logo';
import Dashboard from 'components/svg/Dashboard';
import OrdersIcon from 'components/svg/OrdersIcon';
import Notification from 'components/svg/Notification';
import Mail from 'components/svg/Mail';
import Kebab from 'components/svg/Kebab';
import Laundry from 'components/svg/Laundry';
import Users from 'components/svg/Users';
import Reviews from 'components/svg/Reviews';
import Categories from 'components/svg/Categories';
import Items from 'components/svg/Items';
import GoCredit from 'components/svg/GoCredit';

import Areas from 'components/svg/Areas';
import CatAreas from 'components/svg/CatAreas';
import Login from 'components/svg/Login';
import {withRouter} from 'react-router-dom';
export default function Navigation() {
    let isMenuVisible = window.location.href.match("login");
    console.log(isMenuVisible);
    return (
        <Fragment>
            <nav className='navbar navbar-dark fixed-top flex-md-nowrap p-0'>
                <Link to='/' className='navbar-brand col-md col-sm-3 col-md-2 mr-0'><Logo /><span>Go Laundry</span></Link>
                <input className='form-control form-control-dark search w-100' type='text' placeholder='Search' aria-label='Search' />
                <ul className='navbar-nav px-3'>
                    <li className='nav-item text-nowrap'>
                        <div className='nav-link'>
                            <span><Notification /></span>
                            <span><Mail /></span>
                            <span><Kebab /></span>
                        </div>
                    </li>   
                </ul>
            </nav>
            <div className='container-fluid'>
                <div className='row'>
                    <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
                    <div style={!isMenuVisible ? {} : { display: 'none' }} className='sidebar-sticky'>
                            <ul className='nav flex-column'>

                                <li className='nav-item'>
                                    <NavLink to='/dashboard/' className='nav-link'>
                                        <Dashboard />
                                        <span>Dashboard</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/orders/' className='nav-link'>
                                        <OrdersIcon />
                                        <span>Orders</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/laundries/' className='nav-link'>
                                        <Laundry />
                                        <span>Laundries</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/customers/' className='nav-link'>
                                        <Users />
                                        <span>Users</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/reviews/' className='nav-link'>
                                        <Reviews />
                                        <span>Reviews</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/categories/' className='nav-link'>
                                        <Categories />
                                        <span>Categories</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/items/' className='nav-link'>
                                        <Items />
                                        <span>Items</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/gocredit/' className='nav-link'>
                                        <GoCredit />
                                        <span>GoCredit</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/catAreas/' className='nav-link'>
                                        <CatAreas />
                                        <span>CatAreas</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/areas/' className='nav-link'>
                                        <Areas />
                                        <span>Areas</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/laundryReport/' className='nav-link'>
                                        <GoCredit />
                                        <span>LaundryReport</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/userReport/' className='nav-link'>
                                        <GoCredit />
                                        <span>UserReport</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/orderReassign/' className='nav-link'>
                                        <GoCredit />
                                        <span>OrderReassign</span>
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/notifications/' className='nav-link'>
                                        <GoCredit />
                                        <span>Notifications</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </Fragment>
    );
}
