import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {GridListTile, withStyles} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import Waypoint from "react-waypoint";

const styles = (theme) => ({
    tours: {
        flexBasis: '60%'
    }
});

class BrowseCore extends Component {
    handleTourClick = id => event => this.props.onClickTour && this.props.onClickTour(id);

    renderTours = () => {
        let toursMarkup = this.props.tours.map(tour => (
            <div>
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

        return (
            <GridListTile cols={4}>
                {toursMarkup}
            </GridListTile>
        );
    };

    renderWaypoint = () => {
        if (!this.props.hasReachedEnd && (this.props.tours.length > 0)) {
            return (
                <Waypoint
                    onEnter={this.props.onScroll}
                />
            );
        }
    };

    render () {
        return (
            <div>
                <GridList cols={6} cellHeight={'auto'}>
                    {this.renderTours()}
                </GridList>
                {this.renderWaypoint()}
            </div>
        );
    }
}

BrowseCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrowseCore);