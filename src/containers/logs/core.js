import React, { Component } from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Waypoint from "react-waypoint";
import {isMobile} from 'react-device-detect';

import LogPanelDesktop from './logPanelDesktop';
import LogPanelMobile from './logPanelMobile';

const styles = theme => ({
    root: {
        width: '100%',
    }
});

class LogsCore extends Component {
    formatDate = (timestamp) => {
        let options = {
            day : "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        };
        let date = new Date(timestamp);

        return date.toLocaleDateString('en-GB', options);
    };

    renderLog = (log) => {
        if (isMobile) {
            return (
                <LogPanelMobile
                    log={log}
                    formattedDate={this.formatDate(log.createdAt)}
                />
            );
        } else {
            return (
                <LogPanelDesktop
                    log={log}
                    formattedDate={this.formatDate(log.createdAt)}
                />
            );
        }
    }

    renderLogs = () => {
        return this.props.logs.map(log => (
            <div>
                {this.renderLog(log)}
            </div>
        ));
    };

    renderWaypoint = () => {
        if (!this.props.hasReachedEnd) {
            return (
                <Waypoint
                    onEnter={this.props.onScroll}
                />
            );
        }
    };

    render = () => {
        return (
            <div className={this.props.classes.root}>
                {this.renderLogs()}
                {this.renderWaypoint()}
            </div>
        );
    }
}

LogsCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogsCore);