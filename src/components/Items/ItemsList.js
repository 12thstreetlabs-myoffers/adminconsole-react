import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getItems, unmountItems,deleteItem} from 'actions/items';
import Edit from 'components/svg/Edit';
import Delete from 'components/svg/Delete';
import SortIcon from 'components/svg/SortIcon';
import Loader from 'components/utils/Loader';
import Modal from 'components/Modal';

function mapStateToProps(state) {
    return {
        items: state.items
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getItems,
            unmountItems,
            deleteItem,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class ItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestObject: {
                sortBy: 'ItemId ASC',
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
        this.deleteItem = this.deleteItem.bind(this);
    }
    
    componentDidMount() {
        let data = { ...this.state.requestObject };
        if (this.props.match.params.filter) {
            data = { ...data, status: this.props.match.params.filter.toUpperCase() };
        }
        this.props.actions.getItems(data);
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
            this.props.actions.getItems(requestObject, false, () => { this.setState({ loading: false })});
        }
    }
    
    componentWillUnmount() {
        this.props.actions.unmountItems;
    }
    
    setSorting() {
        const requestObject = { ...this.state.requestObject, sortBy: this.state.requestObject.sortBy.split(' ')[1] === 'DESC' ? 'ItemId ASC' : 'ItemId DESC'};
        this.setState({ requestObject });
        this.props.actions.getItems(requestObject);
    }
    
    setPage(page) {
        return () => {
            const requestObject = { ...this.state.requestObject, startRow: 20 * (page - 1), endRow: 20 * (page) };
            this.setState({ requestObject, page });
            this.props.actions.getItems(requestObject);
        }
    }
    deleteItem() {
        this.props.actions.deleteItem({ ItemId: this.state.deletedId }, () => {
            this.props.actions.getItems(this.state.requestObject);
            this.setState({ modal: false, deletedId: null });
        });
    }
    render() {
        const {items,history } = this.props;
        const { modal, deletedId } = this.state;
        console.log(items);
        return (
            <Fragment>
               <div className='col orders-filter-block'>
                    <div className='col laundry-breadcrumb filters'><Link to='/dashboard/'>Home</Link> > Items <SortIcon onClick={this.setSorting} className={this.state.requestObject.sortBy.split(' ')[1].toLowerCase()} /></div>
                </div>
                <div className='container-fluid m-0 table-container'>
                <Link role='button' className='btn btn-outline-success float-right mb-3' to='/items/add/'>Add Items</Link>
                    <div className='table-responsive'>
                        <table className='table laundry-table'>
                            <thead>
                            <tr>
                                <th scope='col'>Item ID</th>
                                <th scope='col'>Item Name</th>
                                <th scope='col'>Item Arabic Name</th>
                                <th scope='col'>Item Desc</th>
                                <th scope='col'>Item Arabic Desc</th>
                                <th scope='col'>Category ID</th>
                                <th scope='col'>Category Name</th>
                                <th scope='col'>Item Image</th>
                                <th scope='col' />
                            </tr>
                            </thead>
                            <tbody>
                            {
                                items.itemsList.data.map(i => {
                                    return (
                                        <tr key={i.ItemId}>
                                            <td className='emerald'>{i.ItemId}</td>
                                            <td>{i.ItemName}</td>
                                            <td>{i.ItemName_ar}</td>
                                            <td>{i.ItemDesc}</td>
                                            <td>{i.ItemDesc_ar}</td>
                                            <td>{i.CatId}</td>
                                            <td>{i.CategoryName}</td>
                                            <td>{i.ItemImage}</td>
                                            <td>
                                                <Edit onClick={() => { history.push(`/items/edit/${i.ItemId}/`); }} />
                                                <Delete onClick={() => { this.setState({ modal: true, deletedId: i.ItemId }) }} />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    {
                        items.itemsList.total > 0 && (
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
                                        Array.apply(null, { length: Math.ceil(items.itemsList.total / 20, 10) }).map((item, index) => {
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
                                        <button onClick={this.setPage(Math.ceil(items.itemsList.total/ 20, 10))} className='page-link end'>{'>'}</button>
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
                                    <p>Are you really want to delete this Item?</p>
                                </div>
                                <div className='modal-footer'>
                                    <button type='button' onClick={() => { this.setState({ modal: false }) }} className='btn btn-outline-secondary' data-dismiss='modal'>Close</button>
                                    <button type='button' onClick={this.deleteItem} className='btn btn-outline-danger'>Yes</button>
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