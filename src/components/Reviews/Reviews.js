import React, { Fragment, Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getReviews,hideReview, unmounReviews } from 'actions/reviews';
import Delete from 'components/svg/Delete';
import SortIcon from 'components/svg/SortIcon';

function mapStateToProps(state) {
    return {
        reviews: state.reviews
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getReviews,
            unmounReviews,
            hideReview,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Reviews extends Component {
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
            modal: false,
            hideId:null,
        };
        this.setPage = this.setPage.bind(this);
        this.setSorting = this.setSorting.bind(this);
        this.hideReview = this.hideReview.bind(this);
    }
    
    componentDidMount() {
        let data = { ...this.state.requestObject };
        if (this.props.match.params.filter) {
            data = { ...data, status: this.props.match.params.filter.toUpperCase() };
        }
        this.props.actions.getReviews(data);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.match.params.filter !== prevProps.match.params.filter) {
            let requestObject = { ...this.state.requestObject, startRow: 0, endRow: 20 };
            if (this.props.match.params.filter) {
                requestObject = { ...requestObject, status: this.props.match.params.filter.toUpperCase() }
            }
            this.setState({ requestObject });
            this.props.actions.getReviews(requestObject);
        }
    }
    
    componentWillUnmount() {
        this.props.actions.unmounReviews();
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
    hideReview(event) {
        console.log("Inside Hide Review");
        this.props.actions.hideReview({ orderId:event.target.name,hide:event.target.checked}, () => {
            this.props.actions.getReviews(this.state.requestObject);
        });
    }
    render() {
        const { reviews } = this.props;
        const { modal, hideId } = this.state;
        const total = Math.ceil(reviews.reviewList.total / 20);
        return (
            <Fragment>
                <div className='col orders-filter-block'>
                    <div className='col laundry-breadcrumb filters'><Link to='/dashboard/'>Home</Link> > Reviews <SortIcon onClick={this.setSorting} className={this.state.requestObject.sortBy.split(' ')[1].toLowerCase()} /></div>
                </div>
                <div className='container-fluid m-0 table-container'>
                    <div className='table-responsive'>
                        <table className='table laundry-table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Order ID</th>
                                    <th scope='col'>Customer</th>
                                    <th scope='col'>Customer Name</th>
                                    <th scope='col'>Reviews</th>
                                    <th scope='col'>Ratings</th>
                                    <th scope='col'>Review Date</th>
                                    <th scope='col'>Hide</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                reviews.reviewList.data.map(i => {
                                    console.log(i.orderId+":"+i.reviewHide);
                                    const reviewDate = moment(i.ReviewDate);
                                    return (
                                        <tr key={i.orderId}>
                                            <td className='emerald'>{i.orderId}</td>
                                            <td>{i.customerId}</td>
                                            <td>{i.firstname}</td>
                                            <td>{i.reviews}</td>
                                            <td>{i.ratings}</td>
                                            <td>
                                                {reviewDate.format('MM-DD-YYYY')}
                                                <br />
                                                {reviewDate.format('h:mm:ss a')}
                                            </td>
                                            <td>
                                                <input type="checkbox" name={i.orderId}  checked={i.reviewHide} onChange={this.hideReview}/>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                        {
                            total > 1 && (
                                <nav>
                                    <ul className='pagination laundry justify-content-end'>
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
                </div>
                { modal && hideId ?
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
                                    <p>Are you really want to delete this Review?</p>
                                </div>
                                <div className='modal-footer'>
                                    <button type='button' onClick={() => { this.setState({ modal: false }) }} className='btn btn-outline-secondary' data-dismiss='modal'>Close</button>
                                    <button type='button' onClick={this.hideReview} className='btn btn-outline-danger'>Yes</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null
                }
                {this.state.loading && <Loader />}
            </Fragment>
        );
    }
}