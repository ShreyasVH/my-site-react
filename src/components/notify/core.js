import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import SuccessIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

class NotifyCore extends Component {
    handleClose = () => this.props.handleClose && this.props.handleClose();

    renderIcon = () => {
        let icon = '';

        switch(this.props.type) {
            case 'success':
                icon = <SuccessIcon />;
                break;
            case 'error':
                icon = <ErrorIcon />;
                break;
            case 'warning':
                icon = <WarningIcon />;
                break;
            case 'info':
                icon = <InfoIcon />;
                break;
        }

        return icon;
    };

    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.isOpen}
                autoHideDuration={2000}
                onClose={this.handleClose}
            >

                <SnackbarContent
                    className={this.props.classes[this.props.type]}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={this.props.classes.message}>
                            {this.renderIcon()}
                            &nbsp;
                            {this.props.message}
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={this.props.classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon className={this.props.classes.icon} />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        );
    }
}

NotifyCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotifyCore);
