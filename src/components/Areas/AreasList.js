import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getAreas, unmountAreas,deleteAreas} from 'actions/areas';
import Edit from 'components/svg/Edit';
import Delete from 'components/svg/Delete';
import SortIcon from 'components/svg/SortIcon';
import Loader from 'components/utils/Loader';
import Modal from 'components/Modal';

function mapStateToProps(state) {
    return {
        areas: state.areas
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getAreas,
            unmountAreas,
            deleteAreas,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class AreasList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestObject: {
                sortBy: 'AreaId ASC',
                start: 0,
                end: 20
            },
            page: 1,
            modal: false,
            deletedId: null,
            loading: false,
        };
        this.setPage = this.setPage.bind(this);
        this.setSorting = this.setSorting.bind(this);
        this.deleteAreas = this.deleteAreas.bind(this);
    }
    
    componentDidMount() {
        let data = { ...this.state.requestObject };
        if (this.props.match.params.filter) {
            data = { ...data, status: this.props.match.params.filter.toUpperCase() };
        }
        this.props.actions.getAreas(data);
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
            this.props.actions.getAreas(requestObject, false, () => { this.setState({ loading: false })});
        }
    }
    
    componentWillUnmount() {
        this.props.actions.unmountAreas();
    }
    
    setSorting() {
        const requestObject = { ...this.state.requestObject, sortBy: this.state.requestObject.sortBy.split(' ')[1] === 'DESC' ? 'AreaId ASC' : 'AreaId DESC'};
        this.setState({ requestObject });
        this.props.actions.getAreas(requestObject);
    }
    
    setPage(page) {
        return () => {
            const requestObject = { ...this.state.requestObject, startRow: 20 * (page - 1), endRow: 20 * (page) };
            this.setState({ requestObject, page });
            this.props.actions.getAreas(requestObject);
        }
    }
    deleteAreas() {
        console.log("Delete Category");
        console.log(this.props.actions);
        this.props.actions.deleteAreas({ AreaId: this.state.deletedId }, () => {
            this.props.actions.getAreas(this.state.requestObject);
            this.setState({ modal: false, deletedId: null });
        });
    }
    render() {
        const {areas,history } = this.props;
        const { modal, deletedId } = this.state;
        console.log("areas");
        console.log(areas);
        return (
            <Fragment>
               <div className='col orders-filter-block'>
                    <div className='col laundry-breadcrumb filters'><Link to='/dashboard/'>Home</Link> > Areas <SortIcon onClick={this.setSorting} className={this.state.requestObject.sortBy.split(' ')[1].toLowerCase()} /></div>
                </div>
                <div className='container-fluid m-0 table-container'>
                <Link role='button' className='btn btn-outline-success float-right mb-3' to='/areas/add/'>Add Areas</Link>
                    <div className='table-responsive'>
                        <table className='table laundry-table'>
                            <thead>
                            <tr>
                                <th scope='col'>Area ID</th>
                                <th scope='col'>Category Area</th>
                                <th scope='col'>Category Area(Arabic)</th>
                                <th scope='col'>Area</th>
                                <th scope='col'>Area(Arabic)</th>
                                <th scope='col' />
                            </tr>
                            </thead>
                            <tbody>
                            {
                                areas.areasList.data.map(i => {
                                    return (
                                        <tr key={i.AreaId}>
                                            <td className='emerald'>{i.AreaId}</td>
                                            <td>{i.CategoryArea}</td>
                                            <td>{i.CategoryArea_ar}</td>
                                            <td>{i.Area}</td>
                                            <td>{i.Area_ar}</td>
                                            <td>
                                                <Edit onClick={() => { history.push(`/areas/edit/${i.AreaId}/`); }} />
                                                <Delete onClick={() => { this.setState({ modal: true, deletedId: i.AreaId }) }} />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    {
                        areas.areasList.total > 0 && (
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
                                        Array.apply(null, { length: Math.ceil(areas.areasList.total / 20, 10) }).map((item, index) => {
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
                                        <button onClick={this.setPage(Math.ceil(areas.areasList.total / 20, 10))} className='page-link end'>{'>'}</button>
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
                                    <p>Are you really want to delete this Area?</p>
                                </div>
                                <div className='modal-footer'>
                                    <button type='button' onClick={() => { this.setState({ modal: false }) }} className='btn btn-outline-secondary' data-dismiss='modal'>Close</button>
                                    <button type='button' onClick={this.deleteAreas} className='btn btn-outline-danger'>Yes</button>
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