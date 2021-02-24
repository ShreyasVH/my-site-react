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

const styles = (theme) => ({
    tours: {
        display: 'inline-block',
        width: '60%'
    },
    years: {
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    row: {
        width: '100%',
        marginTop: '0.5%',
        marginBottom: '0.5%'
    },
    year: {
        color: '#2600ff'
    },
    activeYear: {
        color: 'red'
    },
    root: {
        flexGrow: 1
    }
});

class BrowseCore extends Component {
    handleTourClick = id => event => this.props.onClickTour && this.props.onClickTour(id);

    renderTours = () => {
        let toursMarkup = (
            <div>
                No tours present
            </div>
        );

        if (this.props.tours.length > 0) {
            toursMarkup = this.props.tours.map(tour => (
                <div
                    key={tour.id}
                >
                    <Card onClick={this.handleTourClick(tour.id)}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {tour.name}
                            </Typography>
                        </CardContent>
                    </Card>

                    <br />
                </div>
            ));
        }

        return toursMarkup;
    };

    renderYears = () => {
        return this.props.years.map(year => {
            const linkClass = this.props.classes.year + ((year === this.props.year) ? ' ' + this.props.classes.activeYear : '');

            return (
                <Grid item xs={6} sm={3} lg={2}  key={year}>
                    <Link className={linkClass} to={'/cricbuzz/browse?year=' + year}>
                        {year}
                    </Link>
                </Grid>
            );
        });
    }

    render () {
        let markup = [];

        if (this.props.isLoaded) {
            markup = (
                <div className={this.props.classes.row}>
                    <Grid container>
                        <Grid item xs={8}>
                            {this.renderTours()}
                        </Grid>

                        <Grid item xs={4}>
                            <div className={this.props.classes.years}>
                                <Grid container>
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