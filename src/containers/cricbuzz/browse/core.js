import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {GridListTile, withStyles} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import Waypoint from "react-waypoint";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
    years: {
        paddingLeft: '10%',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '30%'
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '5%'
        }
    },
    title: {
        textAlign: 'center',
        marginBottom: '2%',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5%'
        }
    },
    year: {
        cursor: 'pointer'
    },
    activeYear: {
        backgroundColor: '#60FF87',
        color: 'white'
    },
    startTime: {
        display: 'inline-block',
        float: 'right'
    },
    tourName: {
        display: 'inline-block'
    }
});

class BrowseCore extends Component {
    handleTourClick = id => event => this.props.onClickTour && this.props.onClickTour(id);

    handleYearClick = year => event => this.props.onYearClick && this.props.onYearClick(year);

    renderStartTime = (startTime) => {
        let date = new Date(startTime);
        let options = {
            day: 'numeric',
            month: 'short'
        };
        return (
            <div>
                {date.toLocaleDateString('en-GB', options)}
            </div>
        );
    };

    renderTours = () => {
        let toursMarkup = (
            <div>
                No tours present
            </div>
        );

        if (this.props.tours.length > 0) {
            toursMarkup = this.props.tours.map(tour => (
                <Grid item key={tour.id}>
                    <Card onClick={this.handleTourClick(tour.id)}>
                        <CardContent>
                            <Typography component={'span'} color="textSecondary" className={this.props.classes.tourName}>
                                {tour.name}
                            </Typography>

                            <Typography component={"span"} color="textSecondary" className={this.props.classes.startTime}>
                                {this.renderStartTime(tour.startTime)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ));
        }

        return toursMarkup;
    };

    renderYears = () => {
        return this.props.years.map(year => {
            const linkClass = this.props.classes.year + ((year === this.props.year) ? ' ' + this.props.classes.activeYear : '');

            return (
                <Grid item xs={12} sm={3} md={2} lg={1} key={year} onClick={this.handleYearClick(year)}>
                    <Card className={linkClass}>
                        <CardContent style={{textAlign: 'center', padding: '5%'}}>
                            <span>
                                {year}
                            </span>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
    }

    render () {
        let markup = [];

        if (this.props.isLoaded) {
            markup = (
                <div>
                    <Grid container>
                        <Grid item xs={8} lg={6}>
                            <div className={this.props.classes.title}>
                                <strong>
                                    Tours for {this.props.year}:
                                </strong>
                            </div>

                            <Grid container spacing={8} direction="column">
                                {this.renderTours()}
                            </Grid>
                        </Grid>

                        <Grid item xs={4} lg={6}>
                            <div className={this.props.classes.title}>
                                <strong>
                                    Years:
                                </strong>
                            </div>
                            <div className={this.props.classes.years}>
                                <Grid container justify="space-evenly" spacing={8} alignContent="center" alignItems="center">
                                    {this.renderYears()}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            );
        }

        return (
            <div>
                {markup}
            </div>
        );
    }
}

BrowseCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrowseCore);