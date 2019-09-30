import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotifyCore from './core';

import Context from '../../utils/context';

class Notify extends Component {
    handleClose = () => Context.closeNotify();

    render() {
        return (
            <NotifyCore
                {...this.props}
                handleClose={this.handleClose}
            />
        );
    }
}

function mapStateToProps(state) {
    return ({
        type: state.context.notify.type,
        message: state.context.notify.content,
        isOpen: state.context.notify.isOpen
    });
}

export default connect(mapStateToProps)(Notify);
