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
import Utils from "../../../../utils";
import {Link} from "react-router-dom";
const styles = theme => ({
    innings: {
        marginBottom: '1%'
    },
    root: {
        width: '100%',
        overflowX: 'auto',
        '& a': {
            color: '#42a5f5'
        }
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
    series: {
        color: '#2600ff'
    }
});

class MatchCore extends Component {
    getPlayerLabel = (playerId) => {
        let text = this.props.playerMap[playerId];

        let roles = [];

        let isCaptain = false;
        for (const player of this.props.captains) {
            if (playerId === player.playerId) {
                isCaptain = true;
                break;
            }
        }

        if (isCaptain) {
            roles.push('c');
        }

        if (roles.length > 0) {
            text += ' ( ' + roles.join(' & ') + ' ) ';
        }

        return text;
    }

    handlePlayerClick = playerId => (event) => (this.props.onPlayerClick && this.props.onPlayerClick(playerId));

    renderPlayers = () => {
        let markup = [(
            <Typography component={'h3'} className={this.props.classes.playingSquadsHeader} key={'squads'}>
                {'Playing Squads'}
            </Typography>
        )];
        let teams = {};
        for (let index in this.props.players) {
            let playerObject = this.props.players[index];
            let teamName = this.props.teamMap[playerObject.teamId];
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
                <Typography
                    key={'team_' + teamName}
                >
                    {teamName}
                </Typography>
            );
            let playerObjects = teams[teamName];

            for (let index in playerObjects) {
                let playerObject = playerObjects[index];
                markup.push(
                    <Chip
                        label={this.getPlayerLabel(playerObject.playerId)}
                        className={this.props.classes.chip}
                        variant="outlined"
                        key={'player_' + playerObject.playerId}
                        onClick={this.handlePlayerClick(playerObject.playerId)}
                    />
                );
            }


        }
        return markup;
    };

    renderScorecards = () => {
        let markup = [];

        if (Object.keys(this.props).length > 0) {
            for (let innings = 1; innings <= 4; innings++) {
                markup.push(this.renderInnings(innings));
            }
        }

        return markup;
    };

    renderInnings = innings => {
        let totalInningsCount = 0;

        for (let index in this.props.battingScores) {
            let score = this.props.battingScores[index];
            if (score.innings > totalInningsCount) {
                totalInningsCount = score.innings;
            }
        }


        if (innings <= totalInningsCount) {
            return (
                <div
                    className={`${this.props.classes.innings} ${this.props.classes.borderedContainer}`}
                    key={'innings_' + innings}
                >
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
            switch (this.props.dismissalMap[score.dismissalMode]) {
                case 'Bowled':
                    return (
                        <span>
                            b&nbsp;
                            <Link to={'/cricbuzz/players/detail?id=' + score.bowler.playerId}>
                                {this.props.playerMap[score.bowler.playerId]}
                            </Link>
                        </span>
                    );
                case 'Run Out':
                    let text = [
                        <span>run out&nbsp;</span>
                    ];
                    let fielders = [];
                    for (let index in score.fielders) {
                        let fielder = score.fielders[index];
                        text.push(
                            <Link to={'/cricbuzz/players/detail?id=' + fielder.playerId}>
                                {this.props.playerMap[fielder.playerId]}
                            </Link>
                        );
                        text.push(<span>&nbsp;/&nbsp;</span>)
                    }

                    text.splice(text.length - 1);
                    return text;
                case 'Caught':
                    if (score.fielders[0].playerId === score.bowler.playerId) {
                        return (
                            <span>
                                c & b&nbsp;
                                <Link to={'/cricbuzz/players/detail?id=' + score.bowler.playerId}>
                                    {this.props.playerMap[score.bowler.playerId]}
                                </Link>
                            </span>
                        );
                    } else {
                        return (
                            <span>
                                c&nbsp;
                                    <Link to={'/cricbuzz/players/detail?id=' + score.fielders[0].playerId}>
                                    {this.props.playerMap[score.fielders[0].playerId]}
                                </Link>
                                    &nbsp;b&nbsp;
                                    <Link to={'/cricbuzz/players/detail?id=' + score.bowler.playerId}>
                                    {this.props.playerMap[score.bowler.playerId]}
                                </Link>
                            </span>
                        );
                    }
                case 'Stumped':
                    return (
                        <span>
                            st&nbsp;
                            <Link to={'/cricbuzz/players/detail?id=' + score.fielders[0].playerId}>
                                {this.props.playerMap[score.fielders[0].playerId]}
                            </Link>
                            &nbsp;b&nbsp;
                            <Link to={'/cricbuzz/players/detail?id=' + score.bowler.playerId}>
                                {this.props.playerMap[score.bowler.playerId]}
                            </Link>
                        </span>
                    );
                case 'LBW':
                    return (
                        <span>
                            lbw&nbsp;
                            <Link to={'/cricbuzz/players/detail?id=' + score.bowler.playerId}>
                                {this.props.playerMap[score.bowler.playerId]}
                            </Link>
                        </span>
                    );
                case 'Retired Hurt':
                    return 'Retired Hurt';
                case 'Hit Twice':
                    return 'Hit Twice';
                case 'Hit Wicket':
                    return (
                        <span>
                            Hit Wicket b&nbsp;
                            <Link to={'/cricbuzz/players/detail?id=' + score.bowler.playerId}>
                                {this.props.playerMap[score.bowler.playerId]}
                            </Link>
                        </span>
                    );
                case 'Obstructing the Field':
                    return 'Obstructing the field';
                case 'Timed Out':
                    return 'Timed Out';
                case 'Handled the Ball':
                    return 'Handled the ball';
            }
        } else {
            return 'Not Out';
        }
    };

    renderTotal = (innings) => {
        let runs = 0;
        let wickets = 0;
        let balls = 0;

        for (let index in this.props.battingScores) {
            let battingScore = this.props.battingScores[index];
            if (innings === battingScore.innings) {
                runs += battingScore.runs;

                if (battingScore.dismissalMode) {
                    wickets++;
                }
            }
        }

        for (let index in this.props.extras) {
            let extra = this.props.extras[index];
            if (innings === extra.innings) {
                runs += extra.runs;
            }
        }

        for (let index in this.props.bowlingFigures) {
            let bowlingFigure = this.props.bowlingFigures[index];
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

        for (let index in this.props.extras) {
            let extra = this.props.extras[index];
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
        for (let index in this.props.battingScores) {
            let score = this.props.battingScores[index];
            total += score.runs;

            if (score.dismissalMode) {
                wickets++;
            }

            if (score.innings === innings) {
                inningsName = this.props.teamMap[score.teamId] + ' Innings';
                scores.push(
                    <TableRow
                        key={'score_' + score.id}
                        hover
                    >
                        <TableCell align={'center'}>
                            <Link to={'/cricbuzz/players/detail?id=' + score.playerId}>
                                {this.props.playerMap[score.playerId]}
                            </Link>
                        </TableCell>
                        <TableCell align={'center'}>
                            {this.renderDismissal(score)}
                        </TableCell>
                        <TableCell align={'center'}>
                            {score.runs}
                        </TableCell>
                        <TableCell align={'center'}>
                            {score.balls}
                        </TableCell>
                        <TableCell align={'center'}>
                            {score.fours}
                        </TableCell>
                        <TableCell align={'center'}>
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
                                    <TableCell align="center">Batsman</TableCell>
                                    <TableCell align="center">Dismissal</TableCell>
                                    <TableCell align="center">Runs</TableCell>
                                    <TableCell align="center">Balls</TableCell>
                                    <TableCell align="center">4s</TableCell>
                                    <TableCell align="center">6s</TableCell>
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
        for (let index in this.props.bowlingFigures) {
            let score = this.props.bowlingFigures[index];

            if (score.innings === innings) {
                scores.push(
                    <TableRow
                        key={'figure_' + score.id}
                        hover
                    >
                        <TableCell align={'center'}>
                            <Link to={'/cricbuzz/players/detail?id=' + score.playerId}>
                                {this.props.playerMap[score.playerId]}
                            </Link>
                        </TableCell>
                        <TableCell align={'center'}>
                            {this.renderOverDetails(score.balls)}
                        </TableCell>
                        <TableCell align={'center'}>
                            {score.maidens}
                        </TableCell>
                        <TableCell align={'center'}>
                            {score.runs}
                        </TableCell>
                        <TableCell align={'center'}>
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
                                    <TableCell align="center">Bowler</TableCell>
                                    <TableCell align="center">Overs</TableCell>
                                    <TableCell align="center">Maidens</TableCell>
                                    <TableCell align="center">Runs</TableCell>
                                    <TableCell align="center">Wickets</TableCell>
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

        if (this.props.tossWinner) {
            markup = this.props.teamMap[this.props.tossWinner] + ' won the toss and chose to ' + ((this.props.tossWinner === this.props.batFirst) ? 'bat' : 'bowl');
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

        let match = this.props;

        if (match.winner) {
            result += this.props.teamMap[match.winner] + " won";

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

        teams.push(this.props.teamMap[this.props.team1]);
        teams.push(this.props.teamMap[this.props.team2]);

        return teams.map(team => (
            <Chip
                label={team}
                className={this.props.classes.chip}
                variant="outlined"
                key={'team_' + team}
            />
        ));
    };

    renderStadium = () => {
        let match = this.props;
        const stadium = this.props.stadiumMap[match.stadiumId];
        let stadiumText = stadium.name;

        if (stadium.city) {
            stadiumText += ', ' + stadium.city;
        }

        stadiumText += ', ' + this.props.countryMap[stadium.countryId];

        return stadiumText;
    };

    renderManOfTheMatch = () => {
        return this.props.manOfTheMatchList.map(motm => (
            <Chip
                label={this.props.playerMap[motm.playerId]}
                className={this.props.classes.chip}
                variant="outlined"
                key={'motm_' + motm.playerId}
                onClick={this.handlePlayerClick(motm.playerId)}
            />
        ));
    };

    renderSeriesName = () => {
        if (this.props.series) {
            return (
                <div className={this.props.classes.row}>
                    <strong>
                        Series:
                        &nbsp;
                    </strong>

                    <Link className={this.props.classes.series} to={'/cricbuzz/series/detail?id=' + this.props.series}>
                        {this.props.seriesName + ' - ' + this.props.gameType}
                    </Link>
                </div>
            );
        }
    };

    renderStartTime = () => {
        let date = new Date(this.props.startTime);
        let options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-GB', options);
    };

    renderMatchDetails = () => {
        if (this.props.isLoaded) {
            return (
                <div className={this.props.classes.row}>
                    {this.renderSeriesName()}

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
                        <strong>
                            Start Time:
                            &nbsp;
                        </strong>

                        {this.renderStartTime()}
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