import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCustomerDetail, unmounCustomers, submitEdit, submitCreate } from 'actions/customers';
import CustomerDetailForm from 'components/Customers/form/CustomerDetailForm';
import { Link } from 'react-router-dom';
import Loader from 'components/utils/Loader';


function mapStateToProps(state) {
    return {
        customer: state.customers.customerDetail,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getCustomerDetail,
            unmounCustomers,
            submitEdit,
            submitCreate,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class CustomerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.submit = this.submit.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }
    
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.actions.getCustomerDetail(this.props.match.params.id);
        }
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id && this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ loading: false });
            this.props.actions.getCustomerDetail(this.props.match.params.id);
        }
    }

    componentWillUnmount() {
        this.props.actions.unmounCustomers();
    }
    
    removeLoading() {
        this.setState({ loading: false });
        window.scrollTo();
    }
    
    submit(values) {
        this.setState({ loading: true });
        const address = { isDefault:1 };
        if (values.address) {
            values.address.split(',').forEach((i, index) => {
                address[`addressLine${index + 1}`] = i;
            });
        }
        if (this.props.match.params.id) {
            return this.props.actions.submitEdit(
                { ...values, address },
                () => this.props.history.push('/customers/'),
                this.removeLoading,
            );
        }
        return this.props.actions.submitCreate(
            { ...values, address },
            (id) => this.props.history.push(`/customers/edit/${id}/`),
            this.removeLoading
        );
    }
    
    render() {
        const { customer, match } = this.props;
        return (
            <div className='container-fluid order-detail-block'>
                <div className='col laundry-breadcrumb'>
                    <Link to='/dashboard/'>Home</Link> > <Link to='/customers/'>Customer</Link> > {match.params.id ? `#${match.params.id}` : 'Create Customer'}
                </div>
                <div className='col order-name-block'>
                    {
                        match.params.id ? `Customer #${match.params.id}` : 'Create Customer'
                    }
                </div>
                {
                    customer.fetching && match.params.id ? <CustomerDetailForm onSubmit={this.submit} initialValues={customer.data} /> : null
                }
                {
                    !match.params.id && <CustomerDetailForm onSubmit={this.submit} create />
                }
                { this.state.loading && <Loader /> }
            </div>
        );
    }
}