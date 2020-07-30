import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCatAreasDetail, unmountCatAreas, submitEdit,submitCreateCatAreas } from 'actions/catAreas';
import CatAreasDetailForm from 'components/CatAreas/CatAreasDetailForm';
import { Link } from 'react-router-dom';
import Loader from 'components/utils/Loader';


function mapStateToProps(state) {
    console.log(state.Areas); 
    return {
                catAreas: state.catAreas.catAreasDetail,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getCatAreasDetail,
            submitEdit,
            submitCreateCatAreas,
            unmountCatAreas,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class CatAreasDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.submitFrom = this.submitFrom.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }
    
    componentDidMount() {
        this.props.actions.getCatAreasDetail(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.unmountCatAreas();
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
                () => { this.props.history.push('/catAreas/') },
                this.removeLoading
            );
        }else{
            return this.props.actions.submitCreateCatAreas(
                values,
                (id) =>{this.props.history.push(`/catAreas/edit/${id}/`)},
                this.removeLoading
            );
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id && this.props.match.params.id !== prevProps.match.params.id) {
            this.props.actions.getCatAreasDetail(this.props.match.params.id);
        }
    }
    render() {
        const { catAreas, match } = this.props;
        return (
            <div className='container-fluid order-detail-block'>
                <div className='col laundry-breadcrumb'><Link to='/dashboard/'>Home</Link> > <Link to='/catAreas/'>CatAreas</Link> > #{match.params.id}</div>
                <div className='col order-name-block'>CatArea Id #{match.params.id}</div>
                {
                    catAreas.fetching && match.params.id && <CatAreasDetailForm onSubmit={this.submitFrom} initialValues={catAreas.data}/>
                }
                {
                    !match.params.id && <CatAreasDetailForm onSubmit={this.submitFrom} />
                }
                {this.state.loading && <Loader />}
            </div>
        );
    }
}