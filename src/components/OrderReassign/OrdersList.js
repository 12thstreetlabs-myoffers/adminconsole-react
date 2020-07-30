import React, { Fragment, Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getOrders,reassignOrder, unmounOrders } from 'actions/orderReassign';
import SortIcon from 'components/svg/SortIcon';
import Loader from 'components/utils/Loader';
import { Field, reduxForm } from 'redux-form';
import ReassignProviderForm from './ReassignProviderForm';


function mapStateToProps(state) {
    return {
        orderReassign: state.orderReassign
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getOrders,
            reassignOrder,
            unmounOrders
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestObject: {
                getBy: 'All',
                startRow: 0,
                endRow: 20,
                sortBy: 'orderId DESC'
            },
            page: 1,
            loading: false,
        };
        this.setPage = this.setPage.bind(this);
        this.setSorting = this.setSorting.bind(this);
        this.handleReassign =this.handleReassign.bind(this);
    }
    
    componentDidMount() {
        let data = { ...this.state.requestObject };
        if (this.props.match.params.filter) {
            data = { ...data, status: this.props.match.params.filter.toUpperCase() };
        }
        this.props.actions.getOrders(data);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.match.params.filter !== prevProps.match.params.filter) {
            this.setState({ loading: true });
            let requestObject = { ...this.state.requestObject, startRow: 0, endRow: 20 };
            if (this.props.match.params.filter) {
                requestObject = { ...requestObject, status: this.props.match.params.filter.toUpperCase() }
            } else {
                delete requestObject.status
            }
            this.setState({ requestObject });
            this.props.actions.getOrders(requestObject, false, () => { this.setState({ loading: false })});
        }
    }
    
    componentWillUnmount() {
        this.props.actions.unmounOrders();
    }
    
    setSorting() {
        const requestObject = { ...this.state.requestObject, sortBy: this.state.requestObject.sortBy.split(' ')[1] === 'DESC' ? 'orderId ASC' : 'orderId DESC'};
        this.setState({ requestObject });
        this.props.actions.getOrders(requestObject);
    }
    
    setPage(page) {
        return () => {
            const requestObject = { ...this.state.requestObject, startRow: 20 * (page - 1), endRow: 20 * (page) };
            this.setState({ requestObject, page });
            this.props.actions.getOrders(requestObject);
        }
    }
    handleReassign(values){
        let keys=Object.keys(values);
        let data=keys[0].split(":");
        let orderId = data[1];
        let providerId = values[keys[0]];

        this.props.actions.reassignOrder({ orderId:orderId,providerId:providerId }, () => {
            this.props.actions.getOrders(this.state.requestObject);
        });
    }
    render() {
        const { match, orderReassign } = this.props;
        console.log("Inside ORDERLIST");
        console.log(orderReassign.orderList.providerList);
        return (
            <Fragment>
                <div className='col orders-filter-block'>
                    <div className='col laundry-breadcrumb'><Link to='/dashboard/'>Home</Link> > Orders</div>
                    <div className='col filters'>
                        <SortIcon onClick={this.setSorting} className={this.state.requestObject.sortBy.split(' ')[1].toLowerCase()} />
                    </div>
                </div>
                <div className='container-fluid m-0 table-container'>
                    <div className='table-responsive'>
                        <table className='table laundry-table'>
                            <thead>
                            <tr>
                                <th scope='col'>Order ID</th>
                                <th scope='col'>Customer</th>
                                <th scope='col'>Customer Name</th>
                                <th scope='col'>Date of order</th>
                                <th scope='col'>Delivery Time</th>
                                <th scope='col'>Payment Type</th>
                                <th scope='col'>Status</th>
                                <th scope='col'> Assign Provider</th>
                                <th scope='col' />
                                <th scope='col' />
                                <th scope='col' />
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orderReassign.orderList.data.map(i => {
                                    const orderDate = moment(i.OrderDate);
                                    const deliveryTime = moment(i.DeliveryTime);
                                    return (
                                        <tr key={i.OrderId}>
                                            <td className='emerald'>{i.OrderId}</td>
                                            <td>{i.CustomerId}</td>
                                            <td>{i.FirstName}</td>
                                            <td>
                                                {orderDate.format('MM-DD-YYYY')}
                                                <br />
                                                {orderDate.format('h:mm:ss a')}
                                            </td>
                                            <td>
                                                {deliveryTime.format('MM-DD-YYYY')}
                                                <br />
                                                {deliveryTime.format('h:mm:ss a')}
                                            </td>
                                            <td>{i.PaymentType}</td>
                                            <td className='red'>{i.OrderStatus}</td>
                                            <td>
                                                <ReassignProviderForm 
                                                onSubmit={this.handleReassign}
                                                providerList={orderReassign.orderList.providerList}
                                                orderId={i.OrderId}
                                                />
                                            </td>
                                             {
                                            <td>
                                               
                                                <Link
                                                    role='button'
                                                    className='btn btn-outline-primary detail-button'
                                                    to={`/orderReassign/edit/${i.OrderId}/`}
                                                >
                                                    View
                                                </Link>
                                                
                                            </td>
                                            }
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    {
                        orderReassign.orderList.total > 0 && (
                            <nav>
                                <ul className='pagination laundry justify-content-end mt-3'>
                                    <li className='page-item'>
                                        <button
                                            onClick={this.setPage(1)}
                                            className={`page-link begin${this.state.page === 1 ? ' disabled' : ''}`}
                                            tabIndex='-1'
                                            aria-disabled='true'
                                        >
                                            {'<'}
                                        </button>
                                    </li>
                                    {
                                        Array.apply(null, { length: Math.ceil(orderReassign.orderList.total / 20, 10) }).map((item, index) => {
                                            return (
                                                <li key={ index+ 1} className='page-item'>
                                                    <button
                                                        onClick={this.setPage(index + 1)}
                                                        className={`page-link ${this.state.page === index + 1 ? ' disabled' : ''}`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            );
                                        })
                                    }
                                    <li className='page-item'>
                                        <button onClick={this.setPage(Math.ceil(orderReassign.orderList.total / 20, 10))} className='page-link end'>{'>'}</button>
                                    </li>
                                </ul>
                            </nav>
                        )
                    }
                </div>
                {this.state.loading && <Loader />}
            </Fragment>
        );
    }
}