import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import Utils from "../../../../utils";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    duck: {
        color: 'red'
    },
    fifty: {
        color: 'blue'
    },
    century: {
        color: 'green'
    }
});

const gameTypes = [
    'ODI',
    'TEST',
    'T20'
];

class ScoresCore extends Component {
    getClassForScore = (score) => {
        let className = '';

        if (score === 0) {
            className = 'duck';
        } else if (score >= 100) {
            className = 'century';
        } else if (score >= 50) {
            className = 'fifty';
        }

        return className
    }

    renderScores = () => {
        const scoresMarkup = this.props.scores.map(score => (<TableRow>
            <TableCell className={`${this.props.classes[this.getClassForScore(score.runs)]}`}>
                {score.runs}
            </TableCell>
            <TableCell>
                {score.balls}
            </TableCell>
            <TableCell>
                {Utils.formatDateToString(score.matchTime)}
            </TableCell>
            <TableCell>
                {gameTypes[score.gameType]}
            </TableCell>
            <TableCell>
                {score.team}
            </TableCell>
            <TableCell>
                {score.opposingTeam}
            </TableCell>
            <TableCell>
                {score.series}
            </TableCell>
        </TableRow>));

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Runs</TableCell>
                        <TableCell>Balls</TableCell>
                        <TableCell>Match Date</TableCell>
                        <TableCell>Game Type</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Opposing Team</TableCell>
                        <TableCell>Series</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scoresMarkup}
                </TableBody>
            </Table>
        );
    }

    render() {
        return (
            <div className={this.props.classes.container}>
                {this.renderScores()}
            </div>
        );
    }
}

ScoresCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScoresCore);