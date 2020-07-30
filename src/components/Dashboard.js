import React, { Fragment, Component } from 'react';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, CartesianAxis, Tooltip, Legend,
    PieChart, Pie, Sector, Cell,
} from 'recharts';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getReviews, unmounReviews } from 'actions/reviews';
import SortIcon from 'components/svg/SortIcon';

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            // getReviews,
            // unmounReviews,
        }, dispatch)
    };
}

const data = [
    {
        month: 'Jan', sale: 2400,
    },
    {
        month: 'Feb', sale: 1398,
    },
    {
        month: 'Apr', sale: 9800,
    },
    {
        month: 'Jun', sale: 3908,
    },
    {
        month: 'Jul', sale: 5500,
    },
    {
        month: 'Aug', sale: 6800,
    },
    {
        month: 'Sep', sale: 2300,
    },
    {
        month: 'Oct', sale: 3300,
    },
    {
        month: 'Nov', sale: 11000,
    },
    {
        month: 'Dec', sale: 6300,
    },
];

const pieData = [
    { name: 'Open Orders (1000)', value: 1000 },
    { name: 'Confirmed Orders (300)', value: 300 },
];

const COLORS = ['#15BBBD', '#5861A2'];


@connect(mapStateToProps, mapDispatchToProps)
export default class Dashboard extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         requestObject: {
    //             getBy: 'All',
    //             startRow: 0,
    //             endRow: 20,
    //             sortBy: 'orderId DESC'
    //         },
    //         page: 1,
    //     };
    //     this.setPage = this.setPage.bind(this);
    //     this.setSorting = this.setSorting.bind(this);
    // }
    
    // componentDidMount() {
    //     let data = { ...this.state.requestObject };
    //     if (this.props.match.params.filter) {
    //         data = { ...data, status: this.props.match.params.filter.toUpperCase() };
    //     }
    //     this.props.actions.getReviews(data);
    // }
    //
    // componentDidUpdate(prevProps) {
    //     if (this.props.match.params.filter !== prevProps.match.params.filter) {
    //         let requestObject = { ...this.state.requestObject, startRow: 0, endRow: 20 };
    //         if (this.props.match.params.filter) {
    //             requestObject = { ...requestObject, status: this.props.match.params.filter.toUpperCase() }
    //         }
    //         this.setState({ requestObject });
    //         this.props.actions.getReviews(requestObject);
    //     }
    // }
    //
    // componentWillUnmount() {
    //     this.props.actions.unmounReviews();
    // }
    //
    // setSorting() {
    //     const requestObject = { ...this.state.requestObject, sortBy: this.state.requestObject.sortBy.split(' ')[1] === 'DESC' ? 'orderId ASC' : 'orderId DESC'};
    //     this.setState({ requestObject });
    //     this.props.actions.getOrders(requestObject);
    // }
    //
    // setPage(page) {
    //     return () => {
    //         const requestObject = { ...this.state.requestObject, startRow: 20 * (page - 1), endRow: 20 * (page) };
    //         this.setState({ requestObject, page });
    //         this.props.actions.getOrders(requestObject);
    //     }
    // }
    
    render() {
        const { match } = this.props;
        return (
            <div className='h-100 dashboard-container'>
                <div className='col orders-filter-block'>
                    <div className='col laundry-breadcrumb'>Dashboard</div>
                    <div className='col-lg-8 filters'>
                        <span className='title'>Analytics</span>
                        <div className='float-right'>
                            <Link className={`filter-link${match.url === '/orders/' ? ' active' : ''}`} to='/orders/'>Daily</Link>
                            <Link className={`filter-link${match.url === '/orders/open/' ? ' active' : ''}`} to='/orders/open/'>Weekly</Link>
                            <Link className={`filter-link${match.url === '/orders/cancelled/' ? ' active' : ''}`} to='/orders/cancelled/'>Monthly</Link>
                            <Link className={`filter-link${match.url === '/orders/cancelled/' ? ' active' : ''}`} to='/orders/cancelled/'>Yearly</Link>
                        </div>
                        
                    </div>
                </div>
                <div className='row charts-row mr-0'>
                    <div className='col-lg-8'>
                        <div className='charts-block bar-chart'>
                            <div className='title'>Sale</div>
                            <ResponsiveContainer width='100%' height='85%' >
                                <BarChart data={data} >
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey='month' />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey='sale' fill='#15BBBD' />
                                </BarChart>
                            </ResponsiveContainer>
                            
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='charts-block'>
                            <div className='title'>Orders <Link className='float-right' to='/'>View More ></Link></div>
                            <ResponsiveContainer width='100%' height='85%' >
                                <PieChart>
                                    <Pie data={pieData} dataKey='value' nameKey='name' cx='50%' cy='50%' innerRadius={75} outerRadius={130} fill='#82ca9d' >
                                        {
                                            pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                        }
                                    </Pie>
                                    <Legend verticalAlign='bottom' height={50} iconType='circle' />
                                </PieChart>
                            </ResponsiveContainer>
                            
                        </div>
                    </div>
                </div>
                {/*<div className='row notification-row mr-0'>*/}
                    {/*<div className='col-lg-8 notification-block'>*/}
                        {/*<div className='title'>Recent Notifications</div>*/}
                    {/*</div>*/}
                    {/*<div className='col-lg-4 notification-block'>*/}
                        {/*<div className='title'>Users</div>*/}
                    {/*</div>*/}
                    {/*<div className='col-lg-8'></div>*/}
                    {/*<div className='col-lg-4'>*/}
                        {/*<div className='row notification-block'>*/}
                            {/*<div className='col-lg-4'>*/}
                                {/*<div className='stat-block float-left'></div>*/}
                            {/*</div>*/}
                            {/*<div className='col-lg-4'>*/}
                                {/*<div className='stat-block float-left'></div>*/}
                            {/*</div>*/}
                            {/*<div className='w-100' />*/}
                            {/*<div className='col-lg-4'>*/}
                                {/*<div className='stat-block float-left'></div>*/}
                            {/*</div>*/}
                            {/*<div className='col-lg-4'>*/}
                                {/*<div className='stat-block float-left'></div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}