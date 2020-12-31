import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SearchDropDown from "../../../../components/searchDropdown";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

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
        backgroundColor: 'black'
    },
    row: {
        width: '100%',
        marginTop: '0.5%',
        marginBottom: '0.5%'
    },
    halfWidth: {
        width: '50%',
    },
    quarterWidth: {
        width: '25%',
    },
    formFieldInput: {
        width: '99%',
        marginLeft: '0.5%',
        marginRight: '0.5%'
    },
    formField: {
        display: 'inline-block'
    },
    container: {
        padding: '1%'
    },
    playersContainer: {
        margin: '0.25%',
        width: '99.5%',
        border: '1px solid gray',
        // minHeight: '100px',
        borderRadius: '5px'
    },
    manOfTheMatchContainer: {
        minHeight: '60px'
    },
    submit: {
        backgroundColor: '#428bca',
        marginLeft: '48%'
    },
    addInnings: {
        backgroundColor: '#428bca'
    },
    scorecards: {
        margin: '0.25%',
        width: '99.5%',
        border: '1px solid gray',
        // minHeight: '100px',
        borderRadius: '5px'
    },
    innings: {
        border: '1px solid gray',
        minHeight: '100px',
        borderRadius: '5px'
    },
    battingScoreField: {
        width: '6%'
    },
    bowlingScoreField: {
        width: '8%'
    },
    battingScorePlayer: {
        width: '22%'
    },
    dismissalMode: {
        width: '10%'
    },
    extrasField: {
        width: '20%'
    },
    playerChip: {
        margin: '0.25%'
    }
});

class CreateCore extends Component {
    handleEvent = type => event => this.props.handleEvent && this.props.handleEvent(event);

    handleSeriesSelect = (id, name) => this.props.onSeriesSelect && this.props.onSeriesSelect(id, name);

    handleStadiumSelect = (id, name) => this.props.onStadiumSelect && this.props.onStadiumSelect(id, name);

    handleTeamSelect = number => (id, name) => this.props.onTeamSelect && this.props.onTeamSelect(id, name, number);

    handleTeamSelectForInnings = number => (id, name) => this.props.onTeamSelectForInnings && this.props.onTeamSelectForInnings(id, name, number);

    handlePlayerSelect = number => (id, name) => this.props.onPlayerSelect && this.props.onPlayerSelect(id, name, number);

    handlePlayerRemove = (teamNumber, playerId) => event => this.props.onPlayerRemove && this.props.onPlayerRemove(teamNumber, playerId);

    handlePlayerSearch = event => this.props.onPlayerSearch && this.props.onPlayerSearch(event);

    handleSeriesSearch = event => this.props.onSeriesSearch && this.props.onSeriesSearch(event);

    handlePlayerSelectForBattingScore = (inning, scoreIndex) => (id, name) => this.props.onPlayerSelectForBattingScore && this.props.onPlayerSelectForBattingScore(scoreIndex, inning, id, name);

    handleBowlerSelectForBattingScore = (inning, scoreIndex) => (id, name) => this.props.onBowlerSelectForBattingScore && this.props.onBowlerSelectForBattingScore(scoreIndex, inning, id, name);

    handleFielderSelectForBattingScore = (inning, scoreIndex) => (id, name) => this.props.onFielderSelectForBattingScore && this.props.onFielderSelectForBattingScore(scoreIndex, inning, id, name);

    handleDismissalSelectForBattingScore = (inning, scoreIndex) => (id, name) => this.props.onDismissalModeSelect && this.props.onDismissalModeSelect(scoreIndex, inning, id, name);

    handleBattingScoreFieldKeyUp = (inning, scoreIndex, fieldName) => event => this.props.onBattingScoreFieldKeyUp && this.props.onBattingScoreFieldKeyUp(scoreIndex, inning, fieldName, event);

    handleExtrasKeyUp = (inning, index, type) => event => this.props.onExtrasKeyUp && this.props.onExtrasKeyUp(index, inning, type, event);

    handleBowlerSelectForBowlingFigure = (inning, index) => (id, name) => this.props.onBowlerSelectForBowlingFigure && this.props.onBowlerSelectForBowlingFigure(index, inning, id, name);

    handleBowlingFigureFieldKeyUp = (inning, index, fieldName) => event => this.props.onBowlingFigureFieldKeyUp && this.props.onBowlingFigureFieldKeyUp(index, inning, fieldName, event);

    handleSelectManOfTheMatch = (id, name) => this.props.onSelectManOfTheMatch && this.props.onSelectManOfTheMatch(id, name);

    handleManOfTheMatchRemove = playerId => event => this.props.onManOfTheMatchRemove && this.props.onManOfTheMatchRemove(playerId);

    renderPlayersMarkup = (number) => {
        let markup = [];

        let color = ((1 === number) ? 'primary' : 'secondary');

        if (this.props.players.hasOwnProperty(number)) {
            let players = this.props.players[number];
            for (let id in players) {
                let playerObject = players[id];
                markup.push(
                    <Chip
                        className={this.props.classes.playerChip}
                        label={playerObject.name}
                        onDelete={this.handlePlayerRemove(number, playerObject.id)}
                        color={color}
                    />
                );
            }
        }

        return markup;
    };

    renderManOfTheMatchListMarkup = () => {
        return this.props.manOfTheMatchNames.map((player, index) => {
            let playerId = this.props.manOfTheMatchIds[index];

            return (
                <Chip
                    className={this.props.classes.playerChip}
                    label={player}
                    onDelete={this.handleManOfTheMatchRemove(playerId)}
                    color="primary"
                />
            );
        });
    };

    renderScoreCards = () => {
        return this.props.scoreCards.map((inning, inningNum) => {
            return (
                <div className={`${this.props.classes.row}`}>
                    <div className={this.props.classes.innings}>
                        <div className={this.props.classes.container}>
                            <div className={this.props.classes.row}>
                                <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                    <div className={this.props.classes.formFieldInput}>
                                        <SearchDropDown
                                            items={this.props.teams}
                                            label="Batting Team"
                                            placeholder="Batting Team"
                                            onSelect={this.handleTeamSelectForInnings(inningNum)}
                                            displayValue={inning.battingTeamName}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={this.props.classes.row}>
                                <div className={this.props.classes.playersContainer}>
                                    <div className={this.props.classes.container}>
                                        {this.renderBattingScores(inning.battingScores, inningNum)}
                                    </div>
                                </div>

                            </div>

                            <div className={this.props.classes.row}>
                                <div className={this.props.classes.playersContainer}>
                                    <div className={this.props.classes.container}>
                                        {this.renderExtras(inning.extras, inningNum)}
                                    </div>
                                </div>
                            </div>

                            <div className={this.props.classes.row}>
                                <div className={this.props.classes.playersContainer}>
                                    <div className={this.props.classes.container}>
                                        {this.renderBowlingFigures(inning.bowlingFigures, inningNum)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    renderInning = (number) => {

    };

    renderDisimissal = dismissalModeName => {
        if(dismissalModeName) {
            return dismissalModeName;
        }
    };

    renderBowlerForBattingScore = bowlerName => {
        if (bowlerName) {
            return bowlerName;
        }
    };

    renderFieldersForBattingScore = fielderNames => {
        if (fielderNames) {
            let parts = fielderNames.split(', ');
            let fielders = parts.map(fielder => {
                let nameParts = fielder.split(' ');
                return nameParts[nameParts.length - 1];
            });

            return fielders.join('/');
        }
    };

    renderBattingScores = (scores, innings) => (scores.map((scoreObject, scoreRowIndex) => (
        <div className={this.props.classes.row}>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScorePlayer}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.handlePlayerSearch}
                        items={this.props.playerSuggestions}
                        label="Batsman"
                        placeholder="Batsman"
                        onSelect={this.handlePlayerSelectForBattingScore(innings, scoreRowIndex)}
                        displayValue={scoreObject.batsmanName}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Runs"
                        variant="outlined"
                        fullWidth
                        onKeyUp={this.handleBattingScoreFieldKeyUp(innings, scoreRowIndex, 'runs')}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Balls"
                        variant="outlined"
                        fullWidth
                        onKeyUp={this.handleBattingScoreFieldKeyUp(innings, scoreRowIndex, 'balls')}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Fours"
                        variant="outlined"
                        fullWidth
                        onKeyUp={this.handleBattingScoreFieldKeyUp(innings, scoreRowIndex, 'fours')}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Sixes"
                        variant="outlined"
                        fullWidth
                        onKeyUp={this.handleBattingScoreFieldKeyUp(innings, scoreRowIndex, 'sixes')}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.dismissalMode}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        items={this.props.dismissalModes}
                        label="Dismissal Mode"
                        placeholder="Dismissal Mode"
                        onSelect={this.handleDismissalSelectForBattingScore(innings, scoreRowIndex)}
                        displayValue={this.renderDisimissal(scoreObject.dismissalModeName)}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScorePlayer}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.handlePlayerSearch}
                        items={this.props.playerSuggestions}
                        label="Bowler"
                        placeholder="Bowler"
                        onSelect={this.handleBowlerSelectForBattingScore(innings, scoreRowIndex)}
                        displayValue={this.renderBowlerForBattingScore(scoreObject.bowlerName)}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScorePlayer}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.handlePlayerSearch}
                        items={this.props.playerSuggestions}
                        label="Fielders"
                        placeholder="Fielders"
                        onSelect={this.handleFielderSelectForBattingScore(innings, scoreRowIndex)}
                        displayValue={this.renderFieldersForBattingScore(scoreObject.fielderNames)}
                    />
                </div>
            </div>
        </div>)
    ));

    renderExtras = (extras, innings) => ( extras.map((extraObject, index) => (
        <div className={`${this.props.classes.formField} ${this.props.classes.extrasField}`}>
            <div className={this.props.classes.formFieldInput}>
                <TextField
                    label={extraObject.type}
                    variant="outlined"
                    fullWidth
                    onKeyUp={this.handleExtrasKeyUp(innings, index, extraObject.type)}
                />
            </div>
        </div>
    )));

    renderBowlingFigures = (bowlingFigures, innings) => (bowlingFigures.map((bowlingFigure, index) => (
        <div className={this.props.classes.row}>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScorePlayer}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.handlePlayerSearch}
                        items={this.props.playerSuggestions}
                        label="Bowler"
                        placeholder="Bowler"
                        onSelect={this.handleBowlerSelectForBowlingFigure(innings, index)}
                        displayValue={bowlingFigure.bowlerName}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.bowlingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Balls"
                        variant="outlined"
                        fullWidth
                        onKeyUp={this.handleBowlingFigureFieldKeyUp(innings, index, 'balls')}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.bowlingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Maidens"
                        variant="outlined"
                        fullWidth
                        onKeyUp={this.handleBowlingFigureFieldKeyUp(innings, index, 'maidens')}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.bowlingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Runs"
                        variant="outlined"
                        fullWidth
                        onKeyUp={this.handleBowlingFigureFieldKeyUp(innings, index, 'runs')}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.bowlingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Wickets"
                        variant="outlined"
                        fullWidth
                        onKeyUp={this.handleBowlingFigureFieldKeyUp(innings, index, 'wickets')}
                    />
                </div>
            </div>
        </div>
    )));

    renderScoreCardContainer = () => {
        if(this.props.scoreCards.length > 0) {
            return (
                <div className={this.props.classes.scorecards}>
                    <div className={this.props.classes.container}>
                        {this.renderScoreCards()}
                    </div>
                </div>
            );
        }
    };

    renderManOfTheMatchMarkup = () => {

    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit} className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Add Match
                    </div>
                    <div className={this.props.classes.container}>
                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleSeriesSearch}
                                        items={this.props.seriesSuggestions}
                                        label="Series"
                                        placeholder="Series"
                                        onSelect={this.handleSeriesSelect}
                                        displayValue={this.props.seriesName}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.props.onStadiumSearch}
                                        items={this.props.stadiumSuggestions}
                                        label="Stadium"
                                        placeholder="Stadium"
                                        onSelect={this.handleStadiumSelect}
                                        displayValue={this.props.stadiumName}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.teamSuggestions}
                                        label="Team 1"
                                        placeholder="Team 1"
                                        onSelect={this.handleTeamSelect(1)}
                                        displayValue={this.props.team1Name}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.teamSuggestions}
                                        label="Team 2"
                                        placeholder="Team 2"
                                        onSelect={this.handleTeamSelect(2)}
                                        displayValue={this.props.team2Name}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.teams}
                                        label="Toss Winner"
                                        placeholder="Toss Winner"
                                        onSelect={this.props.onTossWinnerSelect}
                                        displayValue={this.props.tossWinnerName}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.teams}
                                        label="Batting First"
                                        placeholder="Batting First"
                                        onSelect={this.props.onBattingFirstSelect}
                                        displayValue={this.props.battingFirstName}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.resultSuggestions}
                                        label="Result"
                                        placeholder="Result"
                                        onSelect={this.props.onResultSelect}
                                        displayValue={this.props.resultName}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.teams}
                                        label="Winner"
                                        placeholder="Winner"
                                        onSelect={this.props.onWinnerSelect}
                                        displayValue={this.props.winnerName}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        onKeyUp={this.props.onWinMarginKeyUp}
                                        label="Win Margin"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.winMarginTypes}
                                        label="Win Margin Type"
                                        placeholder="Win Margin Type"
                                        onSelect={this.props.onWinMarginTypeSelect}
                                        displayValue={this.props.winMarginTypeName}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        onKeyUp={this.props.onStartTimeKeyUp}
                                        label="Start Time"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.props.onPlayerSearchAll}
                                        items={this.props.playerSuggestions}
                                        label="Team 1 Players"
                                        placeholder="Team 1 Players"
                                        onSelect={this.handlePlayerSelect(1)}
                                        clearOnSelect={true}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.props.onPlayerSearchAll}
                                        items={this.props.playerSuggestions}
                                        label="Team 2 Players"
                                        placeholder="Team 2 Players"
                                        onSelect={this.handlePlayerSelect(2)}
                                        clearOnSelect={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={this.props.classes.playersContainer}>
                                <div className={this.props.classes.container}>
                                    <div className={this.props.classes.row}>
                                        <strong>Players:</strong>
                                    </div>
                                    <div className={this.props.classes.row}>
                                        {this.renderPlayersMarkup(1)}
                                    </div>

                                    <div className={this.props.classes.row}>
                                        {this.renderPlayersMarkup(2)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            {this.renderScoreCardContainer()}
                        </div>

                        <div className={`${this.props.classes.row}`}>
                            <Button
                                color="secondary"
                                variant="contained"
                                className={this.props.classes.addInnings}
                                onClick={this.props.onInningsAdd}
                            >
                                Add Innings
                            </Button>
                        </div>

                        <div className={`${this.props.classes.row}`}>
                            <div className={this.props.classes.playersContainer}>
                                <div className={this.props.classes.container}>
                                    <div className={this.props.classes.row}>
                                        <strong>Man of The Match:</strong>
                                    </div>

                                    <div className={`${this.props.classes.row}`}>
                                        <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                            <div className={this.props.classes.formFieldInput}>
                                                <SearchDropDown
                                                    onKeyUp={this.handlePlayerSearch}
                                                    items={this.props.playerSuggestions}
                                                    label="Man of the Match"
                                                    placeholder="Man of the Match"
                                                    onSelect={this.handleSelectManOfTheMatch}
                                                    clearOnSelect={true}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${this.props.classes.row}`}>
                                        <div className={`${this.props.classes.playersContainer} ${this.props.classes.manOfTheMatchContainer}`}>
                                            <div className={this.props.classes.container}>
                                                {this.renderManOfTheMatchListMarkup()}
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

CreateCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateCore);