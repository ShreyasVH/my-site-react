import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";

// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(Title, Tooltip, Legend, ArcElement);

const styles = theme => ({
    table: {
        // width: 'auto',
        overflow: 'scroll'
    },
    cell: {
        width: 'auto',
        maxWidth: '10px'
    },
    headCell: {
        // backgroundColor: 'black',
        // color: 'white !important'
        color: 'black',
        fontWeight: 'bold'
    },
    details: {
        textAlign: 'center'
    },
    row: {
        width: '100%'
    },
    halfWidth: {
        width: '50%',
        display: 'inline-block'
    },
    root: {
        marginTop: '3%'
    },
    dismissalStats: {
        marginBottom: '5%',
        textAlign: 'center'
    }
});

class DetailsCore extends Component {
    formatDismissalStatsForRender = (stats) => {
        const colorMap = {
            Bowled: {
                backgroundColor: '#a6cee3'
            },
            Caught: {
                backgroundColor: '#1f78b4'
            },
            LBW: {
                backgroundColor: '#b2df8a'
            },
            'Run Out': {
                backgroundColor: '#33a02c'
            },
            Stumped: {
                backgroundColor: '#fb9a99'
            },
            'Hit Twice': {
                backgroundColor: '#e31a1c'
            },
            'Hit Wicket': {
                backgroundColor: '#fdbf6f'
            },
            'Obstructing the Field': {
                backgroundColor: '#ff7f00'
            },
            'Timed Out': {
                backgroundColor: '#cab2d6'
            },
            'Handled the Ball': {
                backgroundColor: '#6a3d9a'
            }
        };

        let labels = [];
        let data = [];
        let backgroundColors = [];
        let hoverBackgroundColors = [];
        for (const [dismissal, count] of Object.entries(stats)) {
            labels.push(dismissal);
            data.push(count);
            backgroundColors.push(colorMap[dismissal].backgroundColor);
            hoverBackgroundColors.push(colorMap[dismissal].hoverBackgroundColor);
        }

        return (
            {
                labels,
                datasets: [
                    {
                        backgroundColor: backgroundColors,
                        hoverBackgroundColor: hoverBackgroundColors,
                        data
                    }
                ]
            }
        );
    }


    renderBattingStats = () => {
        if (this.props.player.battingStats && (Object.keys(this.props.player.battingStats).length > 0)) {
            return (
                <div>
                    <strong>
                        Batting Stats:
                    </strong>
                    <Table className={this.props.classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    GameType
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Innings
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Runs
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Balls
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Notouts
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Average
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Strike Rate
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Highest
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    4s
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    6s
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    50s
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    100s
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {Object.keys(this.props.player.battingStats).map(gameType => (
                                <TableRow key={'battingStat' + gameType}>
                                    <TableCell align="center" padding="none">
                                        {gameType}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.battingStats[gameType].innings}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.battingStats[gameType].runs}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.battingStats[gameType].balls}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.battingStats[gameType].notOuts}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {parseFloat(this.props.player.battingStats[gameType].average).toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {parseFloat(this.props.player.battingStats[gameType].strikeRate).toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.battingStats[gameType].highest}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.battingStats[gameType].fours}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.battingStats[gameType].sixes}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.battingStats[gameType].fifties}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.battingStats[gameType].hundreds}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            );
        }
    }

    renderBowlingStats = () => {
        if (this.props.player.bowlingStats && (Object.keys(this.props.player.bowlingStats).length > 0)) {
            return (
                <div>
                    <strong>
                        Bowling Stats:
                    </strong>
                    <Table className={this.props.classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    GameType
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Innings
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Wickets
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Runs
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Balls
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Economy
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Average
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Strike Rate
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Fifers
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Ten Wickets
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {Object.keys(this.props.player.bowlingStats).map(gameType => (
                                <TableRow key={'battingStat' + gameType}>
                                    <TableCell align="center" padding="none">
                                        {gameType}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.bowlingStats[gameType].innings}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.bowlingStats[gameType].wickets}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.bowlingStats[gameType].runs}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.bowlingStats[gameType].balls}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {parseFloat(this.props.player.bowlingStats[gameType].economy).toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {((this.props.player.bowlingStats[gameType].wickets > 0) ? parseFloat(this.props.player.bowlingStats[gameType].average).toFixed(2) : 0.0)}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {((this.props.player.bowlingStats[gameType].wickets > 0) ? parseFloat(this.props.player.bowlingStats[gameType].strikeRate).toFixed(2) : 0.0)}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.bowlingStats[gameType].fifers}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.bowlingStats[gameType].tenWickets}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            );
        }
    }

    renderFieldingStats = () => {
        if (this.props.player.fieldingStats && (Object.keys(this.props.player.fieldingStats).length > 0)) {
            return (
                <div>
                    <strong>
                        Fielding Stats:
                    </strong>
                    <Table className={this.props.classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    GameType
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Catches
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Runouts
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Stumpings
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {Object.keys(this.props.player.fieldingStats).map(gameType => (
                                <TableRow key={'battingStat' + gameType}>
                                    <TableCell align="center" padding="none">
                                        {gameType}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.fieldingStats[gameType].catches}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.fieldingStats[gameType].runOuts}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.fieldingStats[gameType].stumpings}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            );
        }
    }

    renderPlayerDetails = () => {
        return (
            <div className={this.props.classes.details}>
                <div>
                    <img
                        className={this.props.classes.artistImage}
                        src={this.props.player.image}
                        alt={this.props.player.name}
                    />
                </div>

                <div className={this.props.classes.container}>
                    <p className={this.props.classes.row}>
                        <strong>
                            {this.props.player.name}
                        </strong>
                    </p>

                    <p className={this.props.classes.row}>
                        <strong className={this.props.classes.halfWidth}>
                            Country:
                        </strong>
                        <span className={this.props.classes.halfWidth}>
                            {this.props.player.country.name}
                        </span>
                    </p>

                    <p className={this.props.classes.row}>
                        <strong className={this.props.classes.halfWidth}>
                            Date of Birth:
                        </strong>
                        <span className={this.props.classes.halfWidth}>
                            {(new Date(this.props.player.dateOfBirth)).toLocaleDateString('en-GB')}
                        </span>
                    </p>
                </div>
            </div>
        );
    }

    renderDismissalStats = () => {
        if (this.props.player.dismissalStats && (Object.keys(this.props.player.dismissalStats).length > 0)) {
            return (
                <div className={this.props.classes.dismissalStats}>
                    <h3>
                        <strong>
                            Dismissal Ratios
                        </strong>
                    </h3>

                    <Grid
                        container
                    >
                        {Object.keys(this.props.player.dismissalStats).map(gameType => (
                            <Grid item xs={4}>
                                {/*<Doughnut*/}
                                {/*    data={this.formatDismissalStatsForRender(this.props.player.dismissalStats[gameType])}*/}
                                {/*    options={{*/}
                                {/*        title:{*/}
                                {/*            display:true,*/}
                                {/*            text:gameType,*/}
                                {/*            fontSize:20*/}
                                {/*        },*/}
                                {/*        legend:{*/}
                                {/*            display:true,*/}
                                {/*            position:'right'*/}
                                {/*        },*/}
                                {/*        responsive: true,*/}
                                {/*        maintainAspectRatio: true*/}
                                {/*    }}*/}
                                {/*/>*/}
                            </Grid>
                        ))}
                    </Grid>
                </div>
            );
        }
    }

    renderMarkup = () => {
        if (this.props.isLoaded) {
            return (
                <div className={this.props.classes.root}>
                    <Grid container>
                        <Grid item xs={12} lg={3}>
                            {this.renderPlayerDetails()}
                        </Grid>
                        <Grid item xs={12} lg={9}>
                            {this.renderBattingStats()}
                            <br />
                            {this.renderBowlingStats()}
                            <br />
                            {this.renderFieldingStats()}
                            <br />
                            {/*{this.renderDismissalStats()}*/}
                        </Grid>
                    </Grid>
                    <div>
                        {this.renderDismissalStats()}
                    </div>
                </div>
            );
        }
    }

    render () {
        return (
            <div>
                {this.renderMarkup()}
            </div>
        );
    }
}

DetailsCore.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DetailsCore);