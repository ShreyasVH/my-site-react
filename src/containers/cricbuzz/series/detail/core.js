import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Button, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    seriesName: {
        marginBottom: '30px'
    },
    matchTeams: {
        display: 'inline-block'
    },
    stadium: {
        display: 'inline-block',
        marginLeft: '30%'
    },
    matchStartTime: {
        display: 'inline-block',
        float: 'right'
    },
    row: {
        width: '100%',
        marginTop: '0.5%',
        marginBottom: '0.5%'
    }
});

class SeriesCore extends Component {
    handleMatchClick = id => event => this.props.onClickMatch && this.props.onClickMatch(id);

    handleUpdateMatchClick = matchId => event => this.props.onUpdateMatchClick && this.props.onUpdateMatchClick(event, matchId);

    renderStartTime = match => {
        let date = new Date(match.startTime);
        let options = {
            day: 'numeric',
            month: 'short'
        };
        return date.toLocaleDateString('en-GB', options);
    };

    renderTeams = match => {
        return this.props.teamMap[match.team1] + ' v/s ' + this.props.teamMap[match.team2];
    };

    renderMatchNum = index => (index + 1 + '. ');

    renderStadium = match => {
        const stadium = this.props.stadiumMap[match.stadium];
        let stadiumText = stadium.name

        if (stadium.city) {
            stadiumText += ', ' + stadium.city;
        }

        stadiumText += ', ' + this.props.countryMap[stadium.countryId];

        return stadiumText;
    };

    getWinMargin = (winMargin, winMarginType) => {
        let margin = winMarginType.toLowerCase();

        if (winMargin > 1) {
            margin += 's';
        }

        return margin;
    };

    renderWinner = match => {
        let result = '';

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

    renderMatches = () => {
        return this.props.matches.map((match, index) => (
            <div>
                <Card onClick={this.handleMatchClick(match.id)}>
                    <CardContent>
                        <Typography component={"span"} color="textSecondary" className={this.props.classes.matchTeams}>
                            {this.renderMatchNum(index)}
                            {this.renderTeams(match)}
                        </Typography>

                        <Typography component={"span"} color="textSecondary" className={this.props.classes.stadium}>
                            {this.renderStadium(match)}
                        </Typography>

                        <Typography component={"span"} color="textSecondary" className={this.props.classes.matchStartTime}>
                            {this.renderStartTime(match)}
                        </Typography>

                        <Typography component={"span"} color="textSecondary">
                            {this.renderWinner(match)}
                        </Typography>

                        <div className={this.props.classes.row}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.handleUpdateMatchClick(match.id)}
                            >
                                <EditIcon />
                                Edit
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <br />
            </div>
        ));
    };

    renderSeries = () => {
        if(this.props.isLoaded) {
            return (
                <div>
                    <div className={this.props.classes.seriesName}>
                        {this.props.name + ' - ' + this.props.gameType}
                    </div>

                    {this.renderMatches()}
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                {this.renderSeries()}
            </div>
        );
    }
}

SeriesCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SeriesCore);