import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
    }
});

class SeriesCore extends Component {
    handleMatchClick = id => event => this.props.onClickMatch && this.props.onClickMatch(id);

    renderStartTime = match => {
        let date = new Date(match.startTime);
        let options = {
            day: 'numeric',
            month: 'short'
        };
        return date.toLocaleDateString('en-GB', options);
    };

    renderTeams = match => {
        return match.team1.name + ' v/s ' + match.team2.name;
    };

    renderMatchNum = index => (index + 1 + '. ');

    renderStadium = match => {
        let stadium = match.stadium.name;

        if (match.stadium.city) {
            stadium += ', ' + match.stadium.city;
        }

        stadium += ', ' + match.stadium.country.name;

        return stadium;
    };

    renderWinMargin = (winMargin, winMarginType) => {
        let margin = winMarginType.toLowerCase();

        if (winMargin > 1) {
            margin += 's';
        }

        return margin;
    };

    renderWinner = match => {
        let result = '';

        if (match.winner) {
            result += match.winner.name + " won by " + match.winMargin + " " + this.renderWinMargin(match.winMargin, match.winMarginType);
        }

        return result;
    };

    renderMatches = () => {
        return this.props.series.matches.map((match, index) => (
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
                    </CardContent>
                </Card>

                <br />
            </div>
        ));
    };

    renderSeries = () => {
        if(Object.keys(this.props.series).length > 0) {
            return (
                <div>
                    <div className={this.props.classes.seriesName}>
                        {this.props.series.name + ' - ' + this.props.series.gameType}
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