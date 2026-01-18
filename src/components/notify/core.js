import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Snackbar, SnackbarContent, IconButton,} from '@mui/material';
import {Close as CloseIcon, CheckCircle as SuccessIcon, Error as ErrorIcon, Info as InfoIcon, Warning as WarningIcon} from '@mui/icons-material';
import { green, amber } from '@mui/material/colors';

import {styled} from "@mui/system";

const styles = theme => ({

});

const Container = styled("div")(({ theme }) => ({
    '.success': {
        backgroundColor: green[600],
    },
    '.error': {
        backgroundColor: theme.palette.error.dark,
    },
    '.info': {
        backgroundColor: theme.palette.primary.dark,
    },
    '.warning': {
        backgroundColor: amber[700],
    },
    '.icon': {
        fontSize: 20,
    },
    '.iconVariant': {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    '.message': {
        display: 'flex',
        alignItems: 'center',
    },
}));

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
            <Container>
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
                        className={this.props.type}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className="message">
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
                                className="close"
                                onClick={this.handleClose}
                            >
                                <CloseIcon className="icon" />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </Container>
        );
    }
}

NotifyCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default NotifyCore;
