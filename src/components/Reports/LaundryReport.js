import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { getLaundryReport, unmountLaundryReport} from 'actions/reports';
import Edit from 'components/svg/Edit';
import Delete from 'components/svg/Delete';
import SortIcon from 'components/svg/SortIcon';
import Modal from 'components/Modal';

function mapStateToProps(state) {
    return {
        laundryReports: state.laundryReports,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getLaundryReport,
            unmountLaundryReport
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class LaundryReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestObject: {
                start: 0,
                end: 20,
                sortBy: 'ProviderId DESC',
                filter: 'monthly',
                reportType:'PRO'
            },
            page: 1,
            modal: false,
            deletedId: null,
        };
        this.setPage = this.setPage.bind(this);
        this.setSorting = this.setSorting.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.setReportType = this.setReportType.bind(this);
    }
    
    componentDidMount() {
        let data = { ...this.state.requestObject };
        this.props.actions.getLaundryReport(data);
    }
    
    componentWillUnmount() {
        this.props.actions.unmountLaundryReport();
    }

    setSorting() {
        const requestObject = { ...this.state.requestObject, sortBy: this.state.requestObject.sortBy.split(' ')[1] === 'DESC' ? 'ProviderId ASC' : 'ProviderId DESC'};
        this.setState({ requestObject });
        this.props.actions.getLaundryReport(requestObject);
    }
    setFilter(event){
        const requestObject = { ...this.state.requestObject, filter:event.target.value};
        this.setState({ requestObject });
        this.props.actions.getLaundryReport(requestObject);
    }
    setReportType(event){
        const requestObject = { ...this.state.requestObject, reportType:event.target.value};
        this.setState({ requestObject });
        this.props.actions.getLaundryReport(requestObject);
    }
    setPage(page) {
        return () => {
            const requestObject = { ...this.state.requestObject, start: 20 * (page - 1), end: 20 * (page) };
            this.setState({ requestObject, page });
            this.props.actions.getLaundryReport(requestObject);
        }
    }
    render() {
        const { laundryReports, history } = this.props;
        console.log(laundryReports.laundryReport.data);
        const { modal, deletedId } = this.state;
        const total = Math.ceil(laundryReports.laundryReport.total / 20);
        return (
            <Fragment>
                <div className='col orders-filter-block'>
                    <div className='col laundry-breadcrumb filters'><Link to='/dashboard/'>Home</Link> > Laundries <SortIcon onClick={this.setSorting} className={this.state.requestObject.sortBy.split(' ')[1].toLowerCase()} /></div>
                </div>
                <div className='container-fluid m-0 table-container'>
                   <label> DURATION FILTERS - </label>
                   <label> <input type="radio" value="daily" checked={this.state.requestObject.filter === "daily"} onChange={this.setFilter}/> Daily</label>
                   <label> <input type="radio" value="weekly" checked={this.state.requestObject.filter === "weekly"} onChange={this.setFilter}/> Weekly</label>
                   <label> <input type="radio" value="monthly" checked={this.state.requestObject.filter === "monthly"} onChange={this.setFilter}/> Monthly</label>
                   <label> REPORT TYPES - </label>
                   <label> <input type="radio" value="PRO" checked={this.state.requestObject.reportType === "PRO"} onChange={this.setReportType}/> NORMAL PROVIDER</label>
                   <label> <input type="radio" value="PPRO" checked={this.state.requestObject.reportType === "PPRO"} onChange={this.setReportType}/> COMMERCIAL PROVIDER</label>
                    <div className='table-responsive'>
                        <table className='table laundry-table'>
                            <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>ProviderId</th>
                                <th scope='col'>TotalOrders</th>
                                <th scope='col'>TotalOnlineOrders</th>
                                <th scope='col'>OnlineRevenue</th>
                                <th scope='col'>TotalCODOrders</th>
                                <th scope='col'>CodRevenue</th>
                                <th scope='col'>TotalRevenue</th>
                                <th scope='col'>PaymentDue</th>
                                <th scope='col'>PaymentClearedDate</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                laundryReports.laundryReport.data.map(i => {
                                    const paymentClearedDate = moment(i.paymentClearedDate);
                                    console.log(i.paymentDue);
                                    return (
                                        <tr key={i.providerId}>
                                            <td className='emerald'>{i.name}</td>
                                            <td>{i.providerId}</td>
                                            <td>{i.totalOrders}</td>
                                            <td>{i.totalOnlineOrders}</td>
                                            <td>{i.onlineRevenue}</td>
                                            <td>{i.totalCODOrders}</td>
                                            <td>{i.codRevenue}</td>
                                            <td>{i.totalRevenue}</td>
                                            <td>{i.paymentDue}</td>
                                            <td> {paymentClearedDate.format('MM-DD-YYYY')}
                                                <br />
                                                {paymentClearedDate.format('h:mm:ss a')}
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
            </Fragment>
        );
    }
}