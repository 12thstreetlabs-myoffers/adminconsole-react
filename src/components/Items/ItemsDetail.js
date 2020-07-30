import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getItemDetail, unmountItems, submitEdit,submitCreateItem} from 'actions/items';
import  ItemDetailForm from 'components/items/ItemDetailForm';
import { Link } from 'react-router-dom';
import Loader from 'components/utils/Loader';


function mapStateToProps(state) {
    console.log(state.item); 
    return {
                item: state.items.itemDetail,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            getItemDetail,
            submitEdit,
            submitCreateItem,
            unmountItems
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class ItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.submitFrom = this.submitFrom.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }
    
    componentDidMount() {
        this.props.actions.getItemDetail(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.unmountItems();
    }
    removeLoading() {
        this.setState({ loading: false });
        window.scrollTo();
    }
    
    submitFrom(values) {
        this.setState({ loading: true });
        if (this.props.match.params.id) {
            return this.props.actions.submitEdit(values,
                () => { this.props.history.push('/items/') },
                this.removeLoading,
            );
        }else{
            return this.props.actions.submitCreateItem(
                values,
                (id) =>{this.props.history.push(`/items/edit/${id}/`)},
                this.removeLoading
            );
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id && this.props.match.params.id !== prevProps.match.params.id) {
            this.props.actions.getItemDetail(this.props.match.params.id);
        }
    }
    render() {
        const { item, match } = this.props;
        console.log("Inside Item Detail Render");
        console.log("item.fetching"+ item.fetching+" match.params.id "+ match.params.id);
        console.log(item.data.ItemId);
        return (
            <div className='container-fluid order-detail-block'>
                <div className='col laundry-breadcrumb'><Link to='/dashboard/'>Home</Link> > <Link to='/items/'>Items</Link> > #{match.params.id}</div>
                <div className='col order-name-block'>Item Id #{match.params.id}</div>
                {
                    item.fetching && match.params.id && <ItemDetailForm onSubmit={this.submitFrom} initialValues={item.data} />
                }
                {
                    !match.params.id && <ItemDetailForm onSubmit={this.submitFrom} />
                }
                {this.state.loading && <Loader />}
            </div>
        );
    }
}