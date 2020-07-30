import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLaundryDetail, unmounLaundries, submitEditLandry, submitCreateLaundry } from 'actions/laundries';
import LaundriesDetailForm from 'components/Laundries/form/LaundriesDetailForm';
import { Link } from 'react-router-dom';
import { formValueSelector } from 'redux-form';
import Loader from 'components/utils/Loader';

const selector = formValueSelector('OrderDetailForm');

function mapStateToProps(state) {
    return {
        laundry: state.laundries.laundryDetail,
        itemList: selector(state, 'itemList'),
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getLaundryDetail,
            unmounLaundries,
            submitEditLandry,
            submitCreateLaundry,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class LaundryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.submit = this.submit.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }
    
    componentDidMount() {
        this.props.actions.getLaundryDetail(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.unmounLaundries();
    }
    
    removeLoading() {
        this.setState({ loading: false });
        window.scrollTo();
    }
    
    submit(values) {
        this.setState({ loading: true });
        if (this.props.match.params.id) {
            return this.props.actions.submitEditLandry(
                values,
                () => {this.props.history.push('/laundries/')},
                this.removeLoading,
            )
        }
       /* return this.props.actions.submitCreateLaundry(
            values,
            (id) => this.props.history.push(`/laundries/edit/${id}/`),
            this.removeLoading
        );
        */
       return this.props.actions.submitCreateLaundry(
        values,
        (id) => this.props.history.push(`/laundries/`),
        this.removeLoading
    );
    }
    
    render() {
        const { laundry, match, itemList } = this.props;
        return (
            <div className='container-fluid order-detail-block'>
                <div className='col laundry-breadcrumb'><Link to='/dashboard/'>Home</Link> > <Link to='/laundries/'>Laundry</Link> > #{match.params.id}</div>
                <div className='col order-name-block'>Laundry #{match.params.id}</div>
                {
                    laundry.fetching && match.params.id && (
                        <LaundriesDetailForm
                            onSubmit={this.submit}
                            category={laundry.category}
                            areas = {laundry.areas}
                            initialValues={laundry.data}
                            itemList={itemList}
                        />
                    )
                }
                {
                    !match.params.id && (
                        <LaundriesDetailForm
                            onSubmit={this.submit}
                            category={laundry.category}
                            areas = {laundry.areas}
                            initialValues={{ workingHours: [{day: 'Sunday', isWorkingDay: false, workingHours: []},{day: 'Monday', isWorkingDay: false, workingHours: []}, {day: 'Tuesday', isWorkingDay: false, workingHours: []},{day: 'Wednesday', isWorkingDay: false, workingHours: []},{ day: 'Thursday', IsWorkingDay: false,'workingHours':[]},{day: 'Friday', isWorkingDay: false, workingHours: []},{ day: 'Saturday', isWorkingDay: false, workingHours: []}]  }}
                            itemList={itemList}
                        />
                    )
                }
                { this.state.loading && <Loader /> }
            </div>
        );
    }
}
