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
    },
    halfWidth: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    }
});

class UpdateCore extends Component {
    handleNameChange = event => (this.props.onNameChange && this.props.onNameChange(event));

    handleCandyPokemonSearch = event => (this.props.onCandyPokemonSearch && this.props.onCandyPokemonSearch(event));
    handleRegionSelect = (id, name) => (this.props.onRegionSelect && this.props.onRegionSelect(id, name));
    handleCandyPokemonSelect = (id, name) => (this.props.onCandyPokemonSelect && this.props.onCandyPokemonSelect(id, name));

    handleCandyCountChange = event => (this.props.onCandyCountChange && this.props.onCandyCountChange(event));
    
    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit} className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Update Mon
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
                                        error={!this.props.validateName.isValid}
                                        helperText={this.props.validateName.message}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.regions}
                                        label="Region"
                                        placeholder="Region"
                                        onSelect={this.handleRegionSelect}
                                        displayValue={this.props.regionName}
                                        error={!this.props.validateRegion.isValid}
                                        helperText={this.props.validateRegion.message}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.candyPokemonSuggestions}
                                        label="Candy Pokemon"
                                        placeholder="Candy Pokemon"
                                        onSelect={this.handleCandyPokemonSelect}
                                        displayValue={this.props.candyPokemonName}
                                        onKeyUp={this.handleCandyPokemonSearch}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        type="number"
                                        label="Candies to evolve"
                                        placeholder="Candies"
                                        variant="outlined"
                                        fullWidth
                                        value={this.props.candiesToEvolve}
                                        onChange={this.handleCandyCountChange}
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