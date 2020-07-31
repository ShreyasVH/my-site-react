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

class LogPanelDesktop extends Component {
    render () {
        const log = this.props.log;
        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <Typography className={`${this.props.classes.heading} ${this.props.classes.column}`}>
                            {log.source}
                        </Typography>

                        <Typography
                            className={`${this.props.classes.heading} ${this.props.classes.column}`}
                        >
                            {this.props.formattedDate}
                        </Typography>

                        <Chip
                            label={log.type}
                            className={`${this.props.classes.chip} ${this.props.classes[log.type.toLowerCase()]}`}
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <Typography>
                                {log.content}
                            </Typography>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <br />
            </div>
        );
    }
}

LogPanelDesktop.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogPanelDesktop);