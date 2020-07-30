import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { login } from 'actions/login';
import LoginForm from 'components/Login/LoginForm';
function mapStateToProps(state) {
    console.log(state.login); 
    return {
                login: state.login,
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            login
        }, dispatch)
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.submitFrom = this.submitFrom.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }
    
    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillUnmount() {
       console.log("componentWillUnmount");
    }
    removeLoading() {
        this.setState({ loading: false });
        window.scrollTo();
    }
    
    submitFrom(values) {
        this.setState({ loading: true });
        return this.props.actions.login(values,
                () => { this.props.history.push('/dashboard/') },
                this.removeLoading
        );
    }
    componentDidUpdate(prevProps) {
        console.log("componentWillUnmount");
    }
    render() {
        console.log("INside Login Component Render---------")
        return (
            <div className='container-fluid order-detail-block'>
            <LoginForm onSubmit={this.submitFrom} />
            </div>
        );
    }
}