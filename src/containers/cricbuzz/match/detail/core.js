import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
const styles = theme => ({
    innings: {
        marginBottom: '1%'
    },
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    inningsTitle: {
        padding: theme.spacing.unit * 2.5
    },
    chip: {
        margin: theme.spacing.unit,
    },
    playingSquadsHeader: {
        marginBottom: theme.spacing.unit,
        fontSize: 'initial',
        fontWeight: 'bold'
    },
    row: {
        width: '100%',
        marginTop: '1%',
        marginBottom: '1%'
    },
    container: {
        padding: '1%'
    },
    borderedContainer: {
        margin: '0.25%',
        width: '99.5%',
        border: '1px solid gray',
        borderRadius: '5px'
    },
});

class MatchCore extends Component {
    renderPlayers = () => {
        let markup = [(
            <Typography component={'h3'} className={this.props.classes.playingSquadsHeader}>
                {'Playing Squads'}
            </Typography>
        )];
        let teams = {};
        for (let index in this.props.match.players) {
            let playerObject = this.props.match.players[index];
            let teamName = playerObject.team.name;
            if (teams.hasOwnProperty(teamName)) {
                teams[teamName].push(playerObject);
            } else {
                teams[teamName] = [
                    playerObject
                ];
            }
        }

        for (let teamName in teams) {
            markup.push(
                <Typography>
                    {teamName}
                </Typography>
            );
            let playerObjects = teams[teamName];

            for (let index in playerObjects) {
                let playerObject = playerObjects[index];
                markup.push(
                    <Chip label={playerObject.player.name} className={this.props.classes.chip} variant="outlined" />
                );
            }
        }
        return markup;
    };

    renderScorecards = () => {
        let markup = [];

        if (Object.keys(this.props.match).length > 0) {
            for (let innings = 1; innings <= 4; innings++) {
                markup.push(this.renderInnings(innings));
            }
        }

        return markup;
    };

    renderInnings = innings => {
        let totalInningsCount = 0;

        for (let index in this.props.match.battingScores) {
            let score = this.props.match.battingScores[index];
            if (score.innings > totalInningsCount) {
                totalInningsCount = score.innings;
            }
        }


        if (innings <= totalInningsCount) {
            return (
                <div className={`${this.props.classes.innings} ${this.props.classes.borderedContainer}`}>
                    <div className={this.props.classes.container}>
                        {this.renderBattingScores(innings)}
                        {this.renderBowlingFigures(innings)}
                    </div>
                </div>
            );
        }
    };

    renderDismissal = score => {
        if (score.dismissalMode) {
            switch (score.dismissalMode.name) {
                case 'Bowled':
                    return 'b ' + score.bowler.player.name;
                case 'Run Out':
                    let text = 'run out';
                    let fielders = [];
                    for (let index in score.fielders) {
                        let fielder = score.fielders[index];
                        fielders.push(fielder.player.name);
                    }

                    text += ' ' + fielders.join(' / ');
                    return text;
                case 'Caught':
                    return 'c ' + score.fielders[0].player.name + ' b ' + score.bowler.player.name;
                case 'LBW':
                    return 'lbw b ' + score.bowler.player.name;
                case 'Retired Hurt':
                    return 'Retired Hurt';
            }
        } else {
            return 'Not Out';
        }
    };

    renderTotal = (innings) => {
        let runs = 0;
        let wickets = 0;
        let balls = 0;

        for (let index in this.props.match.battingScores) {
            let battingScore = this.props.match.battingScores[index];
            if (innings === battingScore.innings) {
                runs += battingScore.runs;

                if (battingScore.dismissalMode) {
                    wickets++;
                }
            }
        }

        for (let index in this.props.match.extras) {
            let extra = this.props.match.extras[index];
            if (innings === extra.innings) {
                runs += extra.runs;
            }
        }

        for (let index in this.props.match.bowlingFigures) {
            let bowlingFigure = this.props.match.bowlingFigures[index];
            if (innings === bowlingFigure.innings) {
                balls += bowlingFigure.balls;
            }
        }

        return (
            <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>
                    {runs + ' - ' + wickets + ' ( ' +  this.renderOverDetails(balls) + ' ) '}
                </TableCell>
            </TableRow>
        );
    };

    renderExtras = innings => {
        let total = 0;
        let extras = {
            b: 0,
            lb: 0,
            w: 0,
            nb: 0,
            p: 0
        };

        for (let index in this.props.match.extras) {
            let extra = this.props.match.extras[index];
            if (innings === extra.innings) {
                let typeString = '';
                let type = extra.type;
                let typeParts = type.split('_');
                for (let partIndex in typeParts) {
                    let part = typeParts[partIndex];
                    typeString += part.toLowerCase()[0];
                }

                extras[typeString] = extra.runs;
                total += extra.runs;
            }
        }

        let typeArray = [];
        for (let type in extras) {
            let runs = extras[type];
            typeArray.push(type + " " + runs);
        }

        return (
            <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>
                    {total + '(' + typeArray.join(', ') + ')'}
                </TableCell>
            </TableRow>
        );
    };

    renderBattingScores = innings => {
        let scores = [];
        let inningsName = '';
        let total = 0;
        let wickets = 0;
        for (let index in this.props.match.battingScores) {
            let score = this.props.match.battingScores[index];
            total += score.runs;

            if (score.dismissalMode) {
                wickets++;
            }

            if (score.innings === innings) {
                inningsName = score.team.name + ' Innings';
                scores.push(
                    <TableRow>
                        <TableCell>
                            {score.player.name}
                        </TableCell>
                        <TableCell>
                            {this.renderDismissal(score)}
                        </TableCell>
                        <TableCell>
                            {score.runs}
                        </TableCell>
                        <TableCell>
                            {score.balls}
                        </TableCell>
                        <TableCell>
                            {score.fours}
                        </TableCell>
                        <TableCell>
                            {score.sixes}
                        </TableCell>
                    </TableRow>
                );
            }
        }

        if (scores.length > 0) {
            return (
                <div className={this.props.classes.container}>
                    <Paper className={this.props.classes.root}>
                        <Typography align={"center"} className={this.props.classes.inningsTitle}>{inningsName}</Typography>
                        <Table className={this.props.classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Batsman</TableCell>
                                    <TableCell align="right">Dismissal</TableCell>
                                    <TableCell align="right">Runs</TableCell>
                                    <TableCell align="right">Balls</TableCell>
                                    <TableCell align="right">4s</TableCell>
                                    <TableCell align="right">6s</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {scores}
                                {this.renderExtras(innings)}
                                {this.renderTotal(innings)}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        }
    };

    renderOverDetails = balls => {
        return (Math.floor(balls / 6) + '.' + (balls % 6));
    };

    renderBowlingFigures = innings => {
        let scores = [];
        for (let index in this.props.match.bowlingFigures) {
            let score = this.props.match.bowlingFigures[index];

            if (score.innings === innings) {
                scores.push(
                    <TableRow>
                        <TableCell>
                            {score.player.name}
                        </TableCell>
                        <TableCell>
                            {this.renderOverDetails(score.balls)}
                        </TableCell>
                        <TableCell>
                            {score.maidens}
                        </TableCell>
                        <TableCell>
                            {score.runs}
                        </TableCell>
                        <TableCell>
                            {score.wickets}
                        </TableCell>
                    </TableRow>
                );
            }
        }

        if (scores.length > 0) {
            return (
                <div className={this.props.classes.container}>
                    <Paper className={this.props.classes.root}>
                        <Table className={this.props.classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Bowler</TableCell>
                                    <TableCell align="right">Overs</TableCell>
                                    <TableCell align="right">Maidens</TableCell>
                                    <TableCell align="right">Runs</TableCell>
                                    <TableCell align="right">Wickets</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {scores}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        }
    };

    renderTossMarkup = () => {
        let markup = 'NA';

        if (this.props.match.tossWinner) {
            markup = this.props.match.tossWinner.name + ' won the toss and chose to ' + ((this.props.match.tossWinner.id === this.props.match.battingFirst.id) ? 'bat' : 'bowl');
        }

        return markup;
    };

    getWinMargin = (winMargin, winMarginType) => {
        let margin = winMarginType.toLowerCase();

        if (winMargin > 1) {
            margin += 's';
        }

        return margin;
    };

    renderResultMarkup = () => {
        let result = '';

        let match = this.props.match;

        if (match.winner) {
            result += match.winner.name + " won";

            if (match.winMarginType) {
                result += " by " + match.winMargin + " " + this.getWinMargin(match.winMargin, match.winMarginType);
            }

            if ('SUPER_OVER' === match.result) {
                result += ' (Super Over)';
            }
        } else {
            if (match.result === 'TIE') {
                result = 'Match Tied';
            } else if(match.result === 'DRAW') {
                result = 'Match Drawn';
            } else if(match.result === 'WASHED_OUT') {
                result = 'Match Washed Out';
            }
        }

        return result;
    };

    renderTeams = () => {
        let teams = [];

        teams.push(this.props.match.team1);
        teams.push(this.props.match.team2);

        return teams.map(team => (
            <Chip label={team.name} className={this.props.classes.chip} variant="outlined" />
        ));
    };

    renderStadium = () => {
        let match = this.props.match;
        let stadium = match.stadium.name;

        if (match.stadium.city) {
            stadium += ', ' + match.stadium.city;
        }

        stadium += ', ' + match.stadium.country.name;

        return stadium;
    };

    renderManOfTheMatch = () => {
        return this.props.match.manOfTheMatchList.map(motm => (
            <Chip label={motm.player.name} className={this.props.classes.chip} variant="outlined" />
        ));
    };

    renderMatchDetails = () => {
        if (Object.keys(this.props.match).length > 0) {
            return (
                <div className={this.props.classes.row}>
                    <div className={this.props.classes.row}>
                        <strong>
                            Series:
                            &nbsp;
                        </strong>

                        <span>
                            {this.props.match.series.name + ' - ' + this.props.match.series.gameType}
                        </span>
                    </div>

                    <div className={this.props.classes.row}>
                        <strong>
                            Teams:
                            &nbsp;
                        </strong>

                        {this.renderTeams()}
                    </div>

                    <div className={this.props.classes.row}>
                        <strong>
                            Toss:
                            &nbsp;
                        </strong>

                        {this.renderTossMarkup()}
                    </div>

                    <div className={this.props.classes.row}>
                        <strong>
                            Result:
                            &nbsp;
                        </strong>

                        {this.renderResultMarkup()}
                    </div>

                    <div className={this.props.classes.row}>
                        <strong>
                            Stadium:
                            &nbsp;
                        </strong>

                        {this.renderStadium()}
                    </div>

                    <div className={this.props.classes.row}>
                        <div className={this.props.classes.borderedContainer}>
                            <div className={this.props.classes.container}>
                                {this.renderPlayers()}
                            </div>
                        </div>
                    </div>

                    <div className={this.props.classes.row}>
                        <strong>
                            Man of the Match:
                            &nbsp;
                        </strong>

                        {this.renderManOfTheMatch()}
                    </div>

                    <div className={this.props.classes.row}>
                        <strong>
                            Scorecards:
                            &nbsp;
                        </strong>
                        <div className={this.props.classes.borderedContainer}>
                            <div className={this.props.classes.container}>
                                {this.renderScorecards()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <div className={this.props.classes.container}>
                {this.renderMatchDetails()}
            </div>
        );
    }
}

MatchCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MatchCore);