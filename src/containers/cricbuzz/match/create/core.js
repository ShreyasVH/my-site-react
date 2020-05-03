import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SearchDropDown from "../../../../components/searchDropdown";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    // textField: {
    //     marginRight: 'auto',
    //     marginLeft: 'auto',
    //     marginBottom: '2%',
    //     display: 'inline-block'
    // },
    // halfWidth: {
    //     paddingLeft: '2%',
    //     paddingRight: '2%',
    //     width: '45%'
    // },
    // quarterWidth: {
    //     paddingLeft: '1%',
    //     paddingRight: '1%',
    //     width: '22%'
    // },
    // selectedPlayers: {
    //     // border: '1px solid',
    //     padding: '1%',
    //     // display: 'inline-block'
    // },
    // playerChip: {
    //     margin: '1%'
    // },
    // battingScoreField: {
    //     width: '5%',
    //     marginLeft: '0.5%',
    //     marginRight: '0.5%'
    // },
    // dismissalMode: {
    //     width: '12%'
    // },
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
    }
});

class CreateCore extends Component {
    handleEvent = type => event => this.props.handleEvent && this.props.handleEvent(event);

    handleSearch = type => event => {
        this.props.onSearch && this.props.onSearch(type, event);
    };

    handleSelect = event => {

    };

    handleSeriesSelect = (id, name) => this.props.onSeriesSelect && this.props.onSeriesSelect(id, name);

    handleStadiumSelect = (id, name) => this.props.onStadiumSelect && this.props.onStadiumSelect(id, name);

    handleTeamSelect = number => (id, name) => this.props.onTeamSelect && this.props.onTeamSelect(id, name, number);

    handleTossWinnerSelect = (id, name) => this.props.onTossWinnerSelect && this.props.onTossWinnerSelect(id, name);

    handlePlayerSelect = number => (id, name) => this.props.onPlayerSelect && this.props.onPlayerSelect(id, name, number);

    handlePlayerRemove = (teamNumber, playerId) => event => {

    };

    handlePlayerSearch = event => this.props.onPlayerSearch && this.props.onPlayerSearch(event);

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
                                            onKeyUp={this.handleSearch('teams')}
                                            items={this.props.teamsSuggestions}
                                            label="Batting Team"
                                            placeHolder="Batting Team"
                                            onSelect={this.handleTeamSelect(1)}
                                            value={inning.battingTeamName}
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

            let parts = fielderNames.split(", ");
            let fielders = parts.map(fielder => {
                let nameParts = fielder.split(' ');
                return nameParts[nameParts.length - 1];
            });

            return fielders.join('/');
        }
    };

    renderBattingScores = (scores, innings) => (scores.map(scoreObject => (
        <div className={this.props.classes.row}>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScorePlayer}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.handlePlayerSearch}
                        items={this.props.playersSuggestions}
                        label="Batsman"
                        placeHolder="Batsman"
                        onSelect={this.handlePlayerSelectForBattingScore}
                        value={scoreObject.batsmanName}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Runs"
                        variant="outlined"
                        fullWidth
                        value={scoreObject.runs}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Balls"
                        variant="outlined"
                        fullWidth
                        value={scoreObject.balls}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Fours"
                        variant="outlined"
                        fullWidth
                        value={scoreObject.fours}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Sixes"
                        variant="outlined"
                        fullWidth
                        value={scoreObject.sixes}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.dismissalMode}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.handleSearch}
                        items={this.props.dismissalModes}
                        label="Dismissal Mode"
                        placeHolder="Dismissal Mode"
                        onSelect={this.handleSelect}
                        value={this.renderDisimissal(scoreObject.dismissalModeName)}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScorePlayer}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.handlePlayerSearch}
                        items={this.props.playersSuggestions}
                        label="Bowler"
                        placeHolder="Bowler"
                        onSelect={this.handlePlayerSelectForBattingScore}
                        value={this.renderBowlerForBattingScore(scoreObject.bowlerName)}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScorePlayer}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.handlePlayerSearch}
                        items={this.props.playersSuggestions}
                        label="Fielders"
                        placeHolder="Fielders"
                        onSelect={this.handlePlayerSelectForBattingScore}
                        value={this.renderFieldersForBattingScore(scoreObject.fielderNames)}
                    />
                </div>
            </div>
        </div>)
    ));

    renderExtras = (extras, innings) => ( extras.map(extraObject => (
        <div className={`${this.props.classes.formField} ${this.props.classes.extrasField}`}>
            <div className={this.props.classes.formFieldInput}>
                <TextField
                    label={extraObject.type}
                    variant="outlined"
                    fullWidth
                    value={extraObject.runs}
                />
            </div>
        </div>
    )));

    renderBowlingFigures = (bowlingFigures, innings) => (bowlingFigures.map(bowlingFigure => (
        <div className={this.props.classes.row}>
            <div className={`${this.props.classes.formField} ${this.props.classes.battingScorePlayer}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.handlePlayerSearch}
                        items={this.props.playersSuggestions}
                        label="Bowler"
                        placeHolder="Bowler"
                        onSelect={this.handlePlayerSelectForBattingScore}
                        value={bowlingFigure.bowlerName}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.bowlingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Balls"
                        variant="outlined"
                        fullWidth
                        value={bowlingFigure.balls}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.bowlingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Maidens"
                        variant="outlined"
                        fullWidth
                        value={bowlingFigure.maidens}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.bowlingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Runs"
                        variant="outlined"
                        fullWidth
                        value={bowlingFigure.runs}
                    />
                </div>
            </div>
            <div className={`${this.props.classes.formField} ${this.props.classes.bowlingScoreField}`}>
                <div className={this.props.classes.formFieldInput}>
                    <TextField
                        label="Wickets"
                        variant="outlined"
                        fullWidth
                        value={bowlingFigure.wickets}
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

    render() {
        return (
            <div>
                <form className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Add Match
                    </div>
                    <div className={this.props.classes.container}>
                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleSearch('series')}
                                        items={this.props.seriesSuggestions}
                                        label="Series"
                                        placeHolder="Series"
                                        onSelect={this.handleSeriesSelect}
                                        value={this.props.seriesName}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleSearch('stadium')}
                                        items={this.props.stadiumSuggestions}
                                        label="Stadium"
                                        placeHolder="Stadium"
                                        onSelect={this.handleStadiumSelect}
                                        value={this.props.seriesName}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleSearch('teams')}
                                        items={this.props.teamsSuggestions}
                                        label="Team 1"
                                        placeHolder="Team 1"
                                        onSelect={this.handleTeamSelect(1)}
                                        value={this.props.seriesName}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleSearch('teams')}
                                        items={this.props.teamsSuggestions}
                                        label="Team 2"
                                        placeHolder="Team 2"
                                        onSelect={this.handleTeamSelect(2)}
                                        value={this.props.seriesName}
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
                                        placeHolder="Toss Winner"
                                        onSelect={this.handleSeriesSelect}
                                        value={this.props.seriesName}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.teams}
                                        label="Batting First"
                                        placeHolder="Batting First"
                                        onSelect={this.handleSeriesSelect}
                                        value={this.props.seriesName}
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
                                        placeHolder="Result"
                                        onSelect={this.handleSeriesSelect}
                                        value={this.props.result}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.teams}
                                        label="Winner"
                                        placeHolder="Winner"
                                        onSelect={this.handleSeriesSelect}
                                        value={this.props.winnerName}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        label="Win Margin"
                                        variant="outlined"
                                        fullWidth
                                        value={this.props.winMargin}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleSearch('series')}
                                        items={this.props.winMarginTypes}
                                        label="Win Margin Type"
                                        placeHolder="Win Margin Type"
                                        onSelect={this.handleSeriesSelect}
                                        value={this.props.winMarginTypeName}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleSearch('players')}
                                        items={this.props.playersSuggestions}
                                        label="Team 1 Players"
                                        placeHolder="Team 1 Players"
                                        onSelect={this.handleTeamSelect(1)}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        onKeyUp={this.handleSearch('players')}
                                        items={this.props.playersSuggestions}
                                        label="Team 2 Players"
                                        placeHolder="Team 2 Players"
                                        onSelect={this.handleTeamSelect(1)}
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
                            <Button
                                color="secondary"
                                variant="contained"
                                className={this.props.classes.submit}
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