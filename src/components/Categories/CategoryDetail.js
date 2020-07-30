import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategoryDetail, unmountCategories, submitEdit,submitCreateCategory } from 'actions/categories';
import CategoryDetailForm from 'components/Categories/CategoryDetailForm';
import { Link } from 'react-router-dom';
import Loader from 'components/utils/Loader';


function mapStateToProps(state) {
    console.log(state.category); 
    return {
                category: state.categories.categoryDetail,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getCategoryDetail,
            submitEdit,
            submitCreateCategory,
            unmountCategories,
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class CategoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.submitFrom = this.submitFrom.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }
    
    componentDidMount() {
        this.props.actions.getCategoryDetail(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.unmountCategories();
    }
    removeLoading() {
        this.setState({ loading: false });
        window.scrollTo();
    }
    
    submitFrom(values) {
        this.setState({ loading: true });
        if (this.props.match.params.id) {
            return this.props.actions.submitEdit(values,
                () => { this.props.history.push('/categories/') },
                this.removeLoading,
            );
        }else{
            return this.props.actions.submitCreateCategory(
                values,
                (id) =>{this.props.history.push(`/categories/edit/${id}/`)},
                this.removeLoading
            );
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id && this.props.match.params.id !== prevProps.match.params.id) {
            this.props.actions.getCategoryDetail(this.props.match.params.id);
        }
    }
    render() {
        const { category, match } = this.props;
        console.log("Inside Category Detail Render");
        console.log("cat fetch"+ category.fetching+" match.params.id "+ match.params.id);
        console.log(category);
        return (
            <div className='container-fluid order-detail-block'>
                <div className='col laundry-breadcrumb'><Link to='/dashboard/'>Home</Link> > <Link to='/categories/'>categories</Link> > #{match.params.id}</div>
                <div className='col order-name-block'>CatId #{match.params.id}</div>
                {
                    category.fetching && match.params.id && <CategoryDetailForm onSubmit={this.submitFrom} initialValues={category.data} />
                }
                {
                    !match.params.id && <CategoryDetailForm onSubmit={this.submitFrom} />
                }
                {this.state.loading && <Loader />}
            </div>
        );
    }
}