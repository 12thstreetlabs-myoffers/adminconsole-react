import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getLaundries, unmounLaundries, deleteLaundry } from 'actions/laundries';
import Edit from 'components/svg/Edit';
import Delete from 'components/svg/Delete';
import SortIcon from 'components/svg/SortIcon';
import Modal from 'components/Modal';
import moment from 'moment';

function mapStateToProps(state) {
    return {
        laundries: state.laundries,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getLaundries,
            unmounLaundries,
            deleteLaundry,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class LaundriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestObject: {
                start: 0,
                end: 20,
                sortBy: 'ProviderId DESC',
            },
            page: 1,
            modal: false,
            deletedId: null,
        };
        this.setPage = this.setPage.bind(this);
        this.setSorting = this.setSorting.bind(this);
        this.deleteLaundry = this.deleteLaundry.bind(this);
    }
    
    componentDidMount() {
        let data = { ...this.state.requestObject };
        this.props.actions.getLaundries(data);
    }
    
    componentWillUnmount() {
        this.props.actions.unmounLaundries();
    }

    setSorting() {
        const requestObject = { ...this.state.requestObject, sortBy: this.state.requestObject.sortBy.split(' ')[1] === 'DESC' ? 'ProviderId ASC' : 'ProviderId DESC'};
        this.setState({ requestObject });
        this.props.actions.getLaundries(requestObject);
    }

    setPage(page) {
        return () => {
            const requestObject = { ...this.state.requestObject, start: 20 * (page - 1), end: 20 * (page) };
            this.setState({ requestObject, page });
            this.props.actions.getLaundries(requestObject);
        }
    }

    deleteLaundry() {
        this.props.actions.deleteLaundry({ providerId: this.state.deletedId }, () => {
            this.props.actions.getLaundries(this.state.requestObject);
            this.setState({ modal: false, deletedId: null });
        });
    }
    
    render() {
        const { laundries, history } = this.props;
        console.log(this.props);
        const { modal, deletedId } = this.state;
        const total = Math.ceil(laundries.laundriesList.total / 20);
        return (
            <Fragment>
                <div className='col orders-filter-block'>
                    <div className='col laundry-breadcrumb filters'><Link to='/dashboard/'>Home</Link> > Laundries <SortIcon onClick={this.setSorting} className={this.state.requestObject.sortBy.split(' ')[1].toLowerCase()} /></div>
                </div>
                <div className='container-fluid m-0 table-container'>
                    <Link role='button' className='btn btn-outline-success float-right mb-3' to='/laundries/add/'>Add Laundry</Link>
                    <div className='table-responsive'>
                        <table className='table laundry-table'>
                            <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Area</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Phone</th>
                                <th scope='col'>Services</th>
                                <th scope='col'>Payment Type</th>
                                <th scope='col'>Payment Due</th>
                                <th scope='col'>PaymentClearedDate</th>
                                <th scope='col'>Delivery Charge</th>
                                <th scope='col'>Minimum Order</th>
                                <th scope='col'>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                laundries.laundriesList.data.map(i => {
                                    const paymentClearedDate = moment(i.PaymentClearedDate);
                                    return (
                                        <tr key={i.ProviderId}>
                                            <td className='emerald'>{i.Name}</td>
                                            <td>{i.Address}</td>
                                            <td>{i.Area}</td>
                                            <td>{i.Email}</td>
                                            <td>{i.Phone}</td>
                                            <td>{i.Services}</td>
                                            <td>{i.PaymentType}</td>
                                            <td>{i.PaymentDue}</td>
                                            <td>
                                                {paymentClearedDate.format('MM-DD-YYYY')}
                                                <br />
                                                {paymentClearedDate.format('h:mm:ss a')}
                                            </td>
                                            <td>{i.DeliveryCharge}</td>
                                            <td>{i.MinimumOrder}</td>
                                            <td>
                                                <Edit onClick={() => { history.push(`/laundries/edit/${i.ProviderId}/`); }} />
                                                <Delete onClick={() => { this.setState({ modal: true, deletedId: i.ProviderId }) }} />
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
                                    <p>Are you really want to delete this laundry?</p>
                                </div>
                                <div className='modal-footer'>
                                    <button type='button' onClick={() => { this.setState({ modal: false }) }} className='btn btn-outline-secondary' data-dismiss='modal'>Close</button>
                                    <button type='button' onClick={this.deleteLaundry} className='btn btn-outline-danger'>Yes</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null
                }
            </Fragment>
        );
    }
}