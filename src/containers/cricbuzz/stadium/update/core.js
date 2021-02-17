import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchDropDown from "../../../../components/searchDropdown";

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
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        display: 'block'
    }
});

class UpdateCore extends Component {
    handleNameChange = event => (this.props.onNameChange && this.props.onNameChange(event));

    handleStateChange = event => (this.props.onStateChange && this.props.onStateChange(event));

    handleCityChange = event => (this.props.onCityChange && this.props.onCityChange(event));

    handleCountrySearch = event => (this.props.onCountrySearch && this.props.onCountrySearch(event));
    handleCountrySelect = (id, name) => (this.props.onCountrySelect && this.props.onCountrySelect(id, name));

    handleSubmit = event => (this.props.onSubmit && this.props.onSubmit(event));

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Update Stadium
                    </div>
                    <div className={this.props.classes.container}>
                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        label="Name"
                                        placeholder="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={this.props.name}
                                        onChange={this.handleNameChange}
                                        error={!this.props.validateName().isValid}
                                        helperText={this.props.validateName().message}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleCountrySearch}
                                        items={this.props.countrySuggestions}
                                        label="Country"
                                        placeholder="Country"
                                        onSelect={this.handleCountrySelect}
                                        displayValue={this.props.countryName}
                                        error={!this.props.validateCountry().isValid}
                                        helperText={this.props.validateCountry().message}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        label="State"
                                        placeholder="State"
                                        variant="outlined"
                                        fullWidth
                                        value={this.props.state}
                                        onChange={this.handleStateChange}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        label="City"
                                        placeholder="City"
                                        variant="outlined"
                                        fullWidth
                                        value={this.props.city}
                                        onChange={this.handleCityChange}
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