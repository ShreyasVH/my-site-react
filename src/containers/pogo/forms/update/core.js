import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchDropDown from "../../../../components/searchDropdown";
import DatePicker from "../../../../components/datePicker";
import FileUpload from "../../../../components/fileUpload";
import Checkbox from "@material-ui/core/Checkbox";
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
    oneSixthWidth: {
        width: '16.66%',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        }
    },
    playerChip: {
        margin: '0.25%',
        [theme.breakpoints.down('md')]: {
            width: '99%',
            marginLeft: '0.5%',
            marginRight: '0.5%'
        }
    },
    playersContainer: {
        margin: '0.25%',
        width: '99.5%',
        border: '1px solid gray',
        borderRadius: '5px',
        [theme.breakpoints.down('md')]: {
            marginTop: '3%'
        }
    }
});

class UpdateCore extends Component {
    handleNameChange = event => (this.props.onNameChange && this.props.onNameChange(event));

    handleFileUpload = files => (this.props.onImageSelect && this.props.onImageSelect(files[0]));

    handleReleaseDateChange = event => (this.props.onReleaseDateChange && this.props.onReleaseDateChange(event));

    handleAlolanChange = (event, checked) => this.props.onAlolanChange && this.props.onAlolanChange(event, checked);
    handleGalarianChange = (event, checked) => this.props.onGalarianChange && this.props.onGalarianChange(event, checked);
    handleHisuianChange = (event, checked) => this.props.onHisuianChange && this.props.onHisuianChange(event, checked);
    handleShinyChange = (event, checked) => this.props.onShinyChange && this.props.onShinyChange(event, checked);
    handleFemaleChange = (event, checked) => this.props.onFemaleChange && this.props.onFemaleChange(event, checked);
    handleCostumedChange = (event, checked) => this.props.onCostumedChange && this.props.onCostumedChange(event, checked);

    handleTypeSelect = (id, name) => (this.props.onTypeSelect && this.props.onTypeSelect(id, name));
    handleTypeRemove = (id) => (event) => (this.props.onTypeRemove && this.props.onTypeRemove(id));

    renderTypesMarkup = () => {
        let markup = [];

        let color = 'primary';

        for (let type of this.props.types) {
            markup.push(
                <Chip
                    className={this.props.classes.playerChip}
                    label={type.name}
                    onDelete={this.handleTypeRemove(type.id)}
                    color={color}
                    key={'type-' + type.id}
                />
            );
        }

        return markup;
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit} className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Update Form
                    </div>
                    <div className={this.props.classes.container}>
                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.pokemonSuggestions}
                                        label="Pokemon"
                                        placeholder="Pokemon"
                                        displayValue={this.props.pokemonName}
                                        disabled={true}
                                    />
                                </div>
                            </div>

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
                                    <DatePicker
                                        label={'Release Date'}
                                        placeholder={'Release Date'}
                                        value={this.props.releaseDate}
                                        onChange={this.handleReleaseDateChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneSixthWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <div>
                                        <label>
                                            Alolan:
                                        </label>

                                        <Checkbox
                                            variant="outlined"
                                            fullWidth
                                            checked={this.props.alolan}
                                            onChange={this.handleAlolanChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneSixthWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <div>
                                        <label>
                                            Galarian:
                                        </label>

                                        <Checkbox
                                            variant="outlined"
                                            fullWidth
                                            checked={this.props.galarian}
                                            onChange={this.handleGalarianChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneSixthWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <div>
                                        <label>
                                            Hisuian:
                                        </label>

                                        <Checkbox
                                            variant="outlined"
                                            fullWidth
                                            checked={this.props.hisuian}
                                            onChange={this.handleHisuianChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneSixthWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <div>
                                        <label>
                                            Shiny:
                                        </label>

                                        <Checkbox
                                            variant="outlined"
                                            fullWidth
                                            checked={this.props.shiny}
                                            onChange={this.handleShinyChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneSixthWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <div>
                                        <label>
                                            Female:
                                        </label>

                                        <Checkbox
                                            variant="outlined"
                                            fullWidth
                                            checked={this.props.female}
                                            onChange={this.handleFemaleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneSixthWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <div>
                                        <label>
                                            Costumed:
                                        </label>

                                        <Checkbox
                                            variant="outlined"
                                            fullWidth
                                            checked={this.props.costumed}
                                            onChange={this.handleCostumedChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>


                            <div className={this.props.classes.row}>
                                <div className={this.props.classes.playersContainer}>
                                    <div className={this.props.classes.container}>
                                        <div className={this.props.classes.row}>
                                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                                <div className={this.props.classes.formFieldInput}>
                                                    <SearchDropDown
                                                        items={this.props.allTypes}
                                                        label="Types"
                                                        placeholder="Types"
                                                        onSelect={this.handleTypeSelect}
                                                        error={!this.props.validateTypes.isValid}
                                                        helperText={this.props.validateTypes.message}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={this.props.classes.row}>
                                            {this.renderTypesMarkup()}
                                        </div>
                                    </div>
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