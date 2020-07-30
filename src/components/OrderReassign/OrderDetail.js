import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOrderDetail, unmounOrders, submitEdit } from 'actions/orderReassign';
import OrderDetailForm from 'components/OrderReassign/OrderDetailForm';
import { Link } from 'react-router-dom';
import Loader from 'components/utils/Loader';


function mapStateToProps(state) {
    return {
        order: state.orderReassign.orderDetail,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getOrderDetail,
            submitEdit,
            unmounOrders,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.submitFrom = this.submitFrom.bind(this);
    }
    
    componentDidMount() {
        this.props.actions.getOrderDetail(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.unmounOrders();
    }
    
    submitFrom(values) {
        this.setState({ loading: true });
        const address = {};
        if (values.DeliveryAddress) {
            values.DeliveryAddress.split(',').forEach((i, index) => {
                address[`AddressLine${index + 1}`] = i;
            });
        }
        return this.props.actions.submitEdit(
            { ...values, DeliveryAddress: address },
            () => { this.props.history.push('/orderReassign/') },
            () => {
                this.setState({ loading: false });
                window.scrollTo();
            }
        );
    }
    
    render() {
        console.log("INSIDE ORDER DETAIL REASSIGN");
        const { order, match } = this.props;
        return (
            <div className='container-fluid order-detail-block'>
                <div className='col laundry-breadcrumb'><Link to='/dashboard/'>Home</Link> > <Link to='/orderReassign/'>Orders</Link> > #{match.params.id}</div>
                <div className='col order-name-block'>Order #{match.params.id}</div>
                {
                    order.fetching && <OrderDetailForm onSubmit={this.submitFrom} initialValues={order.data} orderServiceMap={order.orderServiceMap}  />
                }
                {this.state.loading && <Loader />}
            </div>
        );
    }
}