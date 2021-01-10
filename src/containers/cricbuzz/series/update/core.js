import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateTimePicker from "../../../../components/dateTimePicker";
import SearchDropDown from "../../../../components/searchDropdown";
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
            marginBottom: '5%'
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
    oneThirdWidth: {
        width: '33.33%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    quarterWidth: {
        width: '25%',
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
            marginBottom: '5%'
        }
    },
    container: {
        padding: '1%',
        [theme.breakpoints.down('xs')]: {
            padding: '4%'
        }
    },
    submit: {
        backgroundColor: '#428bca',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            marginTop: '5%'
        }
    },
    teamsContainer: {
        margin: '0.25%',
        width: '99.5%',
        border: '1px solid gray',
        borderRadius: '5px'
    },
    teamChip: {
        margin: '0.25%'
    },
    playerChip: {
        margin: '0.25%'
    },
    playersContainer: {
        margin: '0.25%',
        width: '99.5%',
        border: '1px solid gray',
        borderRadius: '5px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '3%'
        }
    },
    manOfTheSeriesContainer: {
        minHeight: '60px'
    },
    pickMots: {
        verticalAlign: 'middle',
        display: 'inline-block',
        marginTop: '2%',
        marginLeft: '0.5%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: '5%',
            '& button': {
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block'
            }
        }
    },
    containerTitle: {
        marginBottom: 'initial',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            marginBottom: '5%'
        }
    }
});

class UpdateCore extends Component {
    handleEvent = type => event => this.props.handleEvent && this.props.handleEvent(event);

    handleNameChange = event => (this.props.onNameChange && this.props.onNameChange(event));

    handleStartTimeChange = event => (this.props.onStartTimeChange && this.props.onStartTimeChange(event));

    handleHomeCountrySelect = (id, name) => (this.props.onHomeCountrySelect && this.props.onHomeCountrySelect(id, name));

    handleTypeSelect = (id, name) => (this.props.onTypeSelect && this.props.onTypeSelect(id, name));

    handleGameTypeSelect = (id, name) => (this.props.onGameTypeSelect && this.props.onGameTypeSelect(id, name));

    handleTeamSelect = (id, name) => (this.props.onTeamSelect && this.props.onTeamSelect(id, name));

    handleTeamSelectForMOTS = (id, name) => (this.props.onTeamSelectForMOTS && this.props.onTeamSelectForMOTS(id, name));

    handlePlayerSelectForMOTS = (id, name) => (this.props.onPlayerSelectForMOTS && this.props.onPlayerSelectForMOTS(id, name));

    handleTeamRemove = (teamId) => event => this.props.onTeamRemove && this.props.onTeamRemove(teamId);

    handleManOfTheSeriesRemove = playerId => event => this.props.onManOfTheSeriesRemove && this.props.onManOfTheSeriesRemove(playerId);

    handlePlayerSearch = event => (this.props.onPlayerSearch && this.props.onPlayerSearch(event));

    handleManOfTheSeriesPick = event => (this.props.onManOfTheSeriesPick && this.props.onManOfTheSeriesPick());

    handleTeamSearch = event => (this.props.onTeamSearch && this.props.onTeamSearch(event));

    handleCountrySearch = event => (this.props.onCountrySearch && this.props.onCountrySearch(event));

    renderTeamsMarkup = () => {
        let markup = [];

        for (let team of this.props.teams) {
            markup.push(
                <Chip
                    className={this.props.classes.teamChip}
                    label={team.name}
                    onDelete={this.handleTeamRemove(team.id)}
                    color={'primary'}
                    key={'team-' + team.id}
                />
            );
        }

        return markup;
    };

    renderManOfTheSeriesListMarkup = () => {
        return this.props.manOfTheSeriesList.map(mots => {

            return (
                <Chip
                    className={this.props.classes.playerChip}
                    label={mots.name}
                    onDelete={this.handleManOfTheSeriesRemove(mots.id)}
                    color="primary"
                    key={'mots-' + mots.id}
                />
            );
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit} className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Update Series
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
                                        label="Home Country"
                                        placeholder="Home Country"
                                        onSelect={this.handleHomeCountrySelect}
                                        displayValue={this.props.homeCountryName}
                                        error={!this.props.validateCountry.isValid}
                                        helperText={this.props.validateCountry.message}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.types}
                                        label="Type"
                                        placeholder="Type"
                                        onSelect={this.handleTypeSelect}
                                        displayValue={this.props.type}
                                        disableEdit
                                        error={!this.props.validateType.isValid}
                                        helperText={this.props.validateType.message}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.gameTypes}
                                        label="Game Type"
                                        placeholder="Game Type"
                                        onSelect={this.handleGameTypeSelect}
                                        displayValue={this.props.gameType}
                                        disableEdit
                                        error={!this.props.validateGameType.isValid}
                                        helperText={this.props.validateGameType.message}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
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

                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.teamSuggestions}
                                        label="Teams"
                                        placeholder="Teams"
                                        onSelect={this.handleTeamSelect}
                                        error={!this.props.validateTeams.isValid}
                                        helperText={this.props.validateTeams.message}
                                        onKeyUp={this.handleTeamSearch}
                                        clearOnSelect
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={this.props.classes.teamsContainer}>
                                <div className={this.props.classes.container}>
                                    <div className={this.props.classes.row}>
                                        <span
                                            className={this.props.classes.containerTitle}
                                        >
                                            <strong>Teams:</strong>
                                        </span>
                                    </div>
                                    <div className={this.props.classes.row}>
                                        {this.renderTeamsMarkup()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${this.props.classes.row}`}>
                            <div className={this.props.classes.playersContainer}>
                                <div className={this.props.classes.container}>
                                    <div className={this.props.classes.row}>
                                        <span
                                            className={this.props.classes.containerTitle}
                                        >
                                            <strong>
                                                Man of The Series:
                                            </strong>
                                        </span>
                                    </div>

                                    <div className={`${this.props.classes.row}`}>
                                        <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                            <div className={this.props.classes.formFieldInput}>
                                                <SearchDropDown
                                                    onKeyUp={this.handlePlayerSearch}
                                                    items={this.props.playerSuggestions}
                                                    label="Man of the Series"
                                                    placeholder="Man of the Series"
                                                    onSelect={this.handlePlayerSelectForMOTS}
                                                    displayValue={this.props.playerNameForMOTS}
                                                />
                                            </div>
                                        </div>

                                        <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                            <div className={this.props.classes.formFieldInput}>
                                                <SearchDropDown
                                                    items={this.props.teams}
                                                    label="Team"
                                                    placeholder="Team"
                                                    onSelect={this.handleTeamSelectForMOTS}
                                                    displayValue={this.props.teamNameForMOTS}
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className={this.props.classes.pickMots}
                                        >
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                onClick={this.handleManOfTheSeriesPick}
                                            >
                                                PICK
                                            </Button>
                                        </div>
                                    </div>

                                    <div className={`${this.props.classes.row}`}>
                                        <div className={`${this.props.classes.playersContainer} ${this.props.classes.manOfTheSeriesContainer}`}>
                                            <div className={this.props.classes.container}>
                                                {this.renderManOfTheSeriesListMarkup()}
                                            </div>
                                        </div>
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