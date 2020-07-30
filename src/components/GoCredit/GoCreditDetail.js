import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGoCreditDetail, unmountGoCredit, submitEdit,submitCreateGoCredit } from 'actions/gocredit';
import GoCreditDetailForm from 'components/GoCredit/GoCreditDetailForm';
import { Link } from 'react-router-dom';
import Loader from 'components/utils/Loader';


function mapStateToProps(state) {
    console.log(state.goCredit); 
    return {
                goCredit: state.gocredit.goCreditDetail,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getGoCreditDetail,
            submitEdit,
            submitCreateGoCredit,
            unmountGoCredit,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class GoCreditDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.submitFrom = this.submitFrom.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }
    
    componentDidMount() {
        this.props.actions.getGoCreditDetail(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.unmountGoCredit();
    }
    removeLoading() {
        this.setState({ loading: false });
        window.scrollTo();
    }
    
    submitFrom(values) {
        this.setState({ loading: true });
        if (this.props.match.params.id) {
            return this.props.actions.submitEdit(values,
                () => { this.props.history.push('/goCredit/') },
                this.removeLoading
            );
        }else{
            return this.props.actions.submitCreateGoCredit(
                values,
                (id) =>{this.props.history.push(`/goCredit/edit/${id}/`)},
                this.removeLoading
            );
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id && this.props.match.params.id !== prevProps.match.params.id) {
            this.props.actions.getGoCreditDetail(this.props.match.params.id);
        }
    }
    render() {
        const { goCredit, match } = this.props;
        console.log("Inside goCredit Detail Render");
        console.log("cat fetch"+ goCredit.fetching+" match.params.id "+ match.params.id);
        console.log(goCredit);
        return (
            <div className='container-fluid order-detail-block'>
                <div className='col laundry-breadcrumb'><Link to='/dashboard/'>Home</Link> > <Link to='/gocredit/'>goCredit</Link> > #{match.params.id}</div>
                <div className='col order-name-block'>PackageId #{match.params.id}</div>
                {
                    goCredit.fetching && match.params.id && <GoCreditDetailForm onSubmit={this.submitFrom} initialValues={goCredit.data} />
                }
                {
                    !match.params.id && <GoCreditDetailForm onSubmit={this.submitFrom} />
                }
                {this.state.loading && <Loader />}
            </div>
        );
    }
}