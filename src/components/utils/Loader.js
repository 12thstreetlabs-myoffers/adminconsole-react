import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            (
                <div className='loader'>
                    <div className='spinner d-flex text-light'>
                        <div className='spinner-border' role='status'>
                            <span className='sr-only' />
                        </div>
                    </div>
                </div>
            ),
            this.el,
        );
    }
}