import React, { Component } from 'react';
import PropTypes from "prop-types";
import {GridListTile, withStyles} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    tourName: {
        marginBottom: '30px'
    },
    seriesDays: {
        display: 'inline-block',
        float: 'right'
    },
    gameType: {
        display: 'inline-block'
    }
});

class TourCore extends Component {
    handleSeriesClick = id => event => this.props.onClickSeries && this.props.onClickSeries(id);

    renderSeriesStartDay = (series) => {
        let date = new Date(series.startTime);
        let options = {
            day: 'numeric',
            month: 'short'
        };
        return date.toLocaleDateString('en-GB', options);
    };

    renderSeriesDuration = (series) => {
        return (
            <div>
                {this.renderSeriesStartDay(series)}
            </div>
        );
    };

    renderSeries = () => {
        return this.props.tour.seriesList.map(series => (
            <div>
                <Card onClick={this.handleSeriesClick(series.id)}>
                    <CardContent>
                        <Typography component={"span"} color="textSecondary" className={this.props.classes.gameType}>
                            {series.gameType}
                        </Typography>
                        <Typography component={"span"} color="textSecondary" className={this.props.classes.seriesDays}>
                            {this.renderSeriesDuration(series)}
                        </Typography>

                    </CardContent>
                </Card>

                <br />
            </div>
        ));
    };

    renderTour = () => {
        if(Object.keys(this.props.tour).length > 0) {
            return (
                <div>
                    <div className={this.props.classes.tourName}>
                        {this.props.tour.name}
                    </div>

                    {this.renderSeries()}
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                {this.renderTour()}
            </div>
        );
    }
}

TourCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TourCore);