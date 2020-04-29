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
        marginBottom: theme.spacing.unit * 5
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
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
    }
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

    renderScorecard = () => {
        let markup = [];

        if (Object.keys(this.props.match).length > 0) {
            for (let innings = 1; innings <= 4; innings++) {
                markup.push(this.renderInnings(innings));
            }
        }

        return markup;
    };

    renderInnings = innings => {
        return (
            <div className={this.props.classes.innings}>
                {this.renderBattingScores(innings)}
                {this.renderBowlingFigures(innings)}
            </div>
        );
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
            }
        } else {
            return 'Not Out';
        }
    };

    renderTotal = (runs, wickets) => {
        return (
            <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>
                    {runs + ' - ' + wickets}
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

            inningsName = score.team.name + ' Innings';
            if (score.innings === innings) {
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
                            {this.renderTotal(total, wickets)}
                        </TableBody>
                    </Table>
                </Paper>
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
            );
        }
    };

    render() {
        return (
            <div>
                {this.renderPlayers()}
                {this.renderScorecard()}
            </div>
        );
    }
}

MatchCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MatchCore);