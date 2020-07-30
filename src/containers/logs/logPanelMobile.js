import React, { Component } from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: theme.typography.fontWeightRegular,
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
    details: {
        flexDirection: 'column'
    },
    date: {
        marginTop: '10px'
    }
});

class LogPanelMobile extends Component {
    render () {
        const log = this.props.log;
        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary className={this.props.classes[log.type.toLowerCase()]}>
                        <div>
                            <Typography className={`${this.props.classes.heading} ${this.props.classes.column}`}>
                                {log.source}
                            </Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={this.props.classes.details}>
                        <Typography>
                            {log.content}
                        </Typography>

                        <Typography
                            className={`${this.props.classes.heading} ${this.props.classes.date}`}
                        >
                            {this.props.formattedDate}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <br />
            </div>
        );
    }
}

LogPanelMobile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogPanelMobile);