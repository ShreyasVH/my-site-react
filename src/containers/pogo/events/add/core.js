import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchDropDown from "../../../../components/searchDropdown";
import DateTimePicker from "../../../../components/dateTimePicker";
import FileUpload from "../../../../components/fileUpload";
import Chip from "@material-ui/core/Chip";

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
    },
    halfWidth: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    chip: {
        margin: '0.25%'
    },
    formsContainer: {
        margin: '0.25%',
        width: '99.5%',
        border: '1px solid gray',
        borderRadius: '5px'
    },
});

class UpdateCore extends Component {
    handleNameChange = event => (this.props.onNameChange && this.props.onNameChange(event));

    handleStartTimeChange = event => (this.props.onStartTimeChange && this.props.onStartTimeChange(event));
    handleEndTimeChange = event => (this.props.onEndTimeChange && this.props.onEndTimeChange(event));

    handlePokemonSearch = event => (this.props.onPokemonSearch && this.props.onPokemonSearch(event));
    handlePokemonSelect = (id, name) => (this.props.onPokemonSelect && this.props.onPokemonSelect(id, name));

    handleFormSelect = (id, name) => (this.props.onFormSelect && this.props.onFormSelect(id, name));
    handleFormRemove = formId => event => this.props.onFormRemove && this.props.onFormRemove(formId);

    renderFormsMarkup = () => {
        return this.props.forms.map(form => (
            <Chip
                className={this.props.classes.chip}
                label={this.props.pokemonMap[form.number].name + ' - ' + form.name}
                onDelete={this.handleFormRemove(form.id)}
                color="primary"
            />
        ));
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit} className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Add Event
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
                                    <DateTimePicker
                                        label={'Start Time'}
                                        placeholder={'End Time'}
                                        value={this.props.startTime}
                                        onChange={this.handleStartTimeChange}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <DateTimePicker
                                        label={'End Time'}
                                        placeholder={'End Time'}
                                        value={this.props.endTime}
                                        onChange={this.handleEndTimeChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={this.props.classes.formsContainer}>
                                <div className={this.props.classes.container}>
                                    <div className={this.props.classes.row}>
                                        <strong>Spawns:</strong>
                                    </div>

                                    <div className={this.props.classes.row}>
                                        <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                            <div className={this.props.classes.formFieldInput}>
                                                <SearchDropDown
                                                    items={this.props.pokemonSuggestions}
                                                    label="Pokemon"
                                                    placeholder="Pokemon"
                                                    onSelect={this.handlePokemonSelect}
                                                    displayValue={this.props.pokemonName}
                                                    onKeyUp={this.handlePokemonSearch}
                                                    error={!this.props.validateForms.isValid}
                                                    helperText={this.props.validateForms.message}
                                                />
                                            </div>
                                        </div>

                                        <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                            <div className={this.props.classes.formFieldInput}>
                                                <SearchDropDown
                                                    items={this.props.formSuggestions}
                                                    label="Form"
                                                    placeholder="Form"
                                                    onSelect={this.handleFormSelect}
                                                    error={!this.props.validateForms.isValid}
                                                    helperText={this.props.validateForms.message}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={this.props.classes.row}>
                                        {this.renderFormsMarkup()}
                                    </div>
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