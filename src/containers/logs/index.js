import React, { Component } from 'react';
import { connect } from 'react-redux';

import LogUtils from '../../utils/logs';

import LogsCore from './core';
import Context from "../../utils/context";

class Logs extends Component {
    componentDidMount() {
        Context.showLoader();
        LogUtils.getLogs(false);
    }

    handleScroll = () => {
        Context.showLoader();
        LogUtils.getLogs(false);
    };

    render() {
        return (
            <LogsCore
                {...this.props}
                onScroll={this.handleScroll}
            />
        );
    }
}

function mapStateToProps(store) {
    return {
        logs: store.logs.logs,
        hasReachedEnd: store.logs.hasReachedEnd
    };
}

export default connect(mapStateToProps)(Logs);