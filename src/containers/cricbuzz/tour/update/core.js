import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateTimePicker from "../../../../components/dateTimePicker";

const styles = theme => ({
    form: {
        margin: '2.5%',
        border: '1px solid black',
        borderRadius: '5px',
        minHeight: '200px'
    },
    formTitle: {
        textAlign: 'center',
        padding: '2%',
        fontSize: '25px',
        color: 'white',
        backgroundColor: 'black',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5%',
        }
    },
    row: {
        width: '100%',
        marginTop: '0.5%',
        marginBottom: '0.5%'
    },
    halfWidth: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    formFieldInput: {
        width: '99%',
        marginLeft: '0.5%',
        marginRight: '0.5%'
    },
    formField: {
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5%',
        }
    },
    container: {
        padding: '1%',
        [theme.breakpoints.down('xs')]: {
            padding: '5%',
        }
    },
    submit: {
        backgroundColor: '#428bca',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

class UpdateCore extends Component {
    handleEvent = type => event => this.props.handleEvent && this.props.handleEvent(event);

    handleStartTimeChange = event => (this.props.onStartTimeChange && this.props.onStartTimeChange(event));

    handleNameChange = event => (this.props.onNameChange && this.props.onNameChange(event));

    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit} className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Update Tour
                    </div>
                    <div className={this.props.classes.container}>
                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        label="Tour"
                                        placeholder="Tour"
                                        variant="outlined"
                                        fullWidth
                                        value={this.props.name}
                                        onChange={this.handleNameChange}
                                        error={!this.props.validateName.isValid}
                                        helperText={this.props.validateName.message}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <DateTimePicker
                                        label={'Start Time'}
                                        placeholder={'Start Time'}
                                        value={this.props.startTime}
                                        onChange={this.handleStartTimeChange}
                                        error={!this.props.validateStartTime.isValid}
                                        helperText={this.props.validateStartTime.message}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={`${this.props.classes.row}`}>
                            <Button
                                color="secondary"
                                variant="contained"
                                className={this.props.classes.submit}
                                type="submit"
                                disabled={!this.props.isFormValid}
                            >
                                Submit
                            </Button>
                        </div>

                    </div>
                </form>
            </div>
        );
    }
}

UpdateCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpdateCore);