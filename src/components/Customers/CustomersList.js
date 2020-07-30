import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getCustomers, unmounCustomers, deleteCustomer } from 'actions/customers';
import SortIcon from 'components/svg/SortIcon';
import Edit from 'components/svg/Edit';
import Delete from 'components/svg/Delete';
import Modal from 'components/Modal';


function mapStateToProps(state) {
    return {
        customers: state.customers,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getCustomers,
            unmounCustomers,
            deleteCustomer,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestObject: {
                start: 0,
                end: 25,
                sortBy: 'CustomerId DESC',
            },
            page: 1,
            modal: false,
            deletedId: null,
        };
        this.setPage = this.setPage.bind(this);
        this.setSorting = this.setSorting.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }
    
    componentDidMount() {
        this.props.actions.getCustomers(this.state.requestObject);
    }

    componentWillUnmount() {
        this.props.actions.unmounCustomers();
    }
    
    setSorting() {
        const requestObject = { ...this.state.requestObject, sortBy: this.state.requestObject.sortBy.split(' ')[1] === 'DESC' ? 'CustomerId ASC' : 'CustomerId DESC'};
        this.setState({ requestObject });
        this.props.actions.getCustomers(requestObject);
    }

    setPage(page) {
        return () => {
            const requestObject = { ...this.state.requestObject, start: 20 * (page - 1), end: 20 * (page) };
            this.setState({ requestObject, page });
            this.props.actions.getCustomers(requestObject);
        }
    }
    
    deleteCustomer() {
        this.props.actions.deleteCustomer({ customerId: this.state.deletedId }, () => {
            this.props.actions.getCustomers(this.state.requestObject);
            this.setState({ modal: false, deletedId: null });
        });
    }
    
    render() {
        const { customers, history } = this.props;
        const { modal, deletedId } = this.state;
        const total = Math.ceil(customers.customersList.total / 20);
        return (
            <Fragment>
                <div className='col orders-filter-block'>
                    <div className='col laundry-breadcrumb filters'><Link to='/dashboard/'>Home</Link> > Users <SortIcon onClick={this.setSorting} className={this.state.requestObject.sortBy.split(' ')[1].toLowerCase()} /></div>
                </div>
                <div className='container-fluid m-0 table-container'>
                    <Link role='button' className='btn btn-outline-success float-right mb-3' to='/customers/add/'>Add User</Link>
                    <div className='table-responsive table-block'>
                        <table className='table laundry-table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Customer ID</th>
                                    <th scope='col'>Customer Type</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Favourites</th>
                                    <th scope='col'>First Name</th>
                                    <th scope='col'>Last Name</th>
                                    <th scope='col'>Phone</th>
                                    <th scope='col'>Gender</th>
                                    <th scope='col'>Go Credit Balance</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                customers.customersList.data.map(i => {
                                    return (
                                        <tr key={i.CustomerId}>
                                            <td className='emerald'>{i.CustomerId}</td>
                                            <td>{i.CustomerType}</td>
                                            <td>{i.Email}</td>
                                            <td>{i.Favourites}</td>
                                            <td>{i.FirstName}</td>
                                            <td>{i.LastName}</td>
                                            <td>{i.Phone}</td>
                                            <td>{i.Gender}</td>
                                            <td>{i.GoCreditBalance}</td>
                                            <td>
                                                <Edit onClick={() => { history.push(`/customers/edit/${i.CustomerId}/`); }} />
                                                <Delete onClick={() => { this.setState({ modal: true, deletedId: i.CustomerId }) }} />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    {
                        total > 1 && (
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
                                        Array.apply(null, { length: total }).map((item, index) => {
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
                                        <button onClick={this.setPage(total)} className='page-link end'>{'>'}</button>
                                    </li>
                                </ul>
                            </nav>
                        )
                    }
                </div>
                { modal && deletedId ?
                    (
                        <Modal positionClass='modal-dialog-centered'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title' id='exampleModalLiveLabel'>Submit action</h5>
                                    <button onClick={() => { this.setState({ modal: false }) }} type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                        <span aria-hidden='true'>×</span>
                                    </button>
                                </div>
                                <div className='modal-body'>
                                    <p>Are you really want to delete this customer?</p>
                                </div>
                                <div className='modal-footer'>
                                    <button type='button' onClick={() => { this.setState({ modal: false }) }} className='btn btn-outline-secondary' data-dismiss='modal'>Close</button>
                                    <button type='button' onClick={this.deleteCustomer} className='btn btn-outline-danger'>Yes</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null
                }
            </Fragment>
        );
    }
}