import React, { Component } from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Chip from "@material-ui/core/Chip";
import Waypoint from "react-waypoint";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    chip: {
        color: 'white',
        padding: '0 !important',
        minWidth: '100px'
    },
    error: {
        backgroundColor: '#d32f2f'
    },
    warning: {
        backgroundColor: '#ffa000'
    },
    debug: {
        backgroundColor: '#1976d2'
    },
    info: {
        backgroundColor: '#43a047'
    },
    column: {
        flexBasis: '45%',
    }
});

class LogsCore extends Component {
    formatDate = (timestamp) => {
        // let options = {
        //     day : "numeric",
        //     month: "short",
        //     year: "numeric",
        //     hour: "numeric",
        //     minute: "numeric"
        // };
        // let date = new Date(timestamp);
        //
        // return date.toLocaleDateString('en-GB', options);
        return '';
    };

    renderLogs = () => {
        return this.props.logs.map(log => (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <Typography className={`${this.props.classes.heading} ${this.props.classes.column}`}>{log.source}</Typography>

                        <Typography className={`${this.props.classes.heading} ${this.props.classes.column}`}>{this.formatDate(log.createdAt)}</Typography>
                        <Chip
                            label={log.type}
                            className={`${this.props.classes.chip} ${this.props.classes[log.type.toLowerCase()]}`}
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {log.content}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <br />
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
            <div>
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