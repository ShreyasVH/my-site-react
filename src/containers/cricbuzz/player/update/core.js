import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchDropDown from "../../../../components/searchDropdown";
import DateTimePicker from "../../../../components/dateTimePicker";
import FileUpload from "../../../../components/fileUpload";

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
    quarterWidth: {
        width: '25%',
    },
    fullWidth: {
        width: '100%',
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
            padding: '4%',
        }
    },
    submit: {
        backgroundColor: '#428bca',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        display: 'block'
    },
    oneThirdWidth: {
        width: '33.33%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    }
});

class UpdateCore extends Component {
    handleNameChange = event => (this.props.onNameChange && this.props.onNameChange(event));

    handleDateOfBirthChange = event => (this.props.onDateOfBirthChange && this.props.onDateOfBirthChange(event));

    handleCountrySearch = event => (this.props.onCountrySearch && this.props.onCountrySearch(event));
    handleCountrySelect = (id, name) => (this.props.onCountrySelect && this.props.onCountrySelect(id, name));

    handleFileUpload = event => files => (this.props.onImageSelect && this.props.onImageSelect(files[0]));

    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit} className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Update Player
                    </div>
                    <div className={this.props.classes.container}>
                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        label="Name"
                                        placeholder="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={this.props.name}
                                        onChange={this.handleNameChange}
                                        error={!this.props.validateName.isValid}
                                        helperText={this.props.validateName.message}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleCountrySearch}
                                        items={this.props.countrySuggestions}
                                        label="Country"
                                        placeholder="Country"
                                        onSelect={this.handleCountrySelect}
                                        displayValue={this.props.countryName}
                                        error={!this.props.validateCountry.isValid}
                                        helperText={this.props.validateCountry.message}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <DateTimePicker
                                        label={'Date of Birth'}
                                        placeholder={'Date of Birth'}
                                        value={this.props.dateOfBirth}
                                        onChange={this.handleDateOfBirthChange}
                                        error={!this.props.validateDateOfBirth.isValid}
                                        helperText={this.props.validateDateOfBirth.message}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.fullWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <FileUpload
                                        name={'image'}
                                        label={'Upload Image'}
                                        onFileUpload={this.handleFileUpload}
                                        fileName={this.props.imageName}
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