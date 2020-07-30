import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAreasDetail, unmountAreas, submitEdit,submitCreateAreas } from 'actions/areas';
import AreasDetailForm from 'components/Areas/AreasDetailForm';
import { Link } from 'react-router-dom';
import Loader from 'components/utils/Loader';


function mapStateToProps(state) {
    console.log(state.Areas); 
    return {
                areas: state.areas.areasDetail,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getAreasDetail,
            submitEdit,
            submitCreateAreas,
            unmountAreas,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class AreasDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.submitFrom = this.submitFrom.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }
    
    componentDidMount() {
        this.props.actions.getAreasDetail(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.unmountAreas();
    }
    removeLoading() {
        this.setState({ loading: false });
        window.scrollTo();
    }
    
    submitFrom(values) {
        this.setState({ loading: true });
        console.log("values");
        console.log(values);
        if (this.props.match.params.id) {
            return this.props.actions.submitEdit(values,
                () => { this.props.history.push('/areas/') },
                this.removeLoading
            );
        }else{
            return this.props.actions.submitCreateAreas(
                values,
                (id) =>{this.props.history.push(`/areas/edit/${id}/`)},
                this.removeLoading
            );
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id && this.props.match.params.id !== prevProps.match.params.id) {
            this.props.actions.getAreasDetail(this.props.match.params.id);
        }
    }
    render() {
        const { areas, match } = this.props;
        console.log("Inside goCredit Detail Render");
        console.log("cat fetch"+ areas.fetching+" match.params.id "+ match.params.id);
        console.log(areas);
        return (
            <div className='container-fluid order-detail-block'>
                <div className='col laundry-breadcrumb'><Link to='/dashboard/'>Home</Link> > <Link to='/areas/'>Areas</Link> > #{match.params.id}</div>
                <div className='col order-name-block'>Area Id #{match.params.id}</div>
                {
                    areas.fetching && match.params.id && <AreasDetailForm onSubmit={this.submitFrom} initialValues={areas.data} categoryAreas={areas.categoryList}/>
                }
                {
                    !match.params.id && <AreasDetailForm onSubmit={this.submitFrom} categoryAreas={areas.categoryList} />
                }
                {this.state.loading && <Loader />}
            </div>
        );
    }
}